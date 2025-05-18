import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import Konva from 'konva';

@Component({
  selector: 'app-map-creator',
  imports: [ReactiveFormsModule],
  templateUrl: './map-creator.component.html',
  styleUrl: './map-creator.component.scss'
})
export default class MapCreatorComponent implements AfterViewInit {

  @ViewChild('containerRef', { static: true }) containerRef!: ElementRef;

  selectedShapes: Konva.Rect[] = [];
  stage!: Konva.Stage;
  layer!: Konva.Layer;
  transformer!: Konva.Transformer;
  selectedShape: Konva.Rect | null = null;
  magnetismoAtivo = true; // você pode trocar com botão/toggle no painel lateral

  ngAfterViewInit(): void {
    this.stage = new Konva.Stage({
      container: this.containerRef.nativeElement,
      width: 1000,
      height: 600,
    });

    this.layer = new Konva.Layer();
    this.stage.add(this.layer);

    this.transformer = new Konva.Transformer({
      enabledAnchors: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
      boundBoxFunc: (oldBox, newBox) => {
        if (newBox.width < 30 || newBox.height < 30) return oldBox;
        return newBox;
      }
    });
    this.layer.add(this.transformer);

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        this.deleteSelected();
      }
    });

    this.stage.on('click', (e) => {
      if (e.target === this.stage) {
        this.selectedShape = null;
        this.transformer.nodes([]);
        this.layer.draw();
      }
    });
  }

  updateTransformer() {
    if (this.transformer) {
      this.transformer.nodes(this.selectedShapes);
      this.layer.batchDraw();
    } else {
      this.transformer = new Konva.Transformer({
        enabledAnchors: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
        boundBoxFunc: (oldBox, newBox) => {
          if (newBox.width < 30 || newBox.height < 30) {
            return oldBox;
          }
          return newBox;
        }
      });
      this.layer.add(this.transformer);
      this.transformer.nodes(this.selectedShapes);
    }
  }

  getGroupBoundingBox(shapes: Konva.Rect[]): { x: number; y: number; width: number; height: number } {
    const boxes = shapes.map(shape => shape.getClientRect());
    const minX = Math.min(...boxes.map(b => b.x));
    const minY = Math.min(...boxes.map(b => b.y));
    const maxX = Math.max(...boxes.map(b => b.x + b.width));
    const maxY = Math.max(...boxes.map(b => b.y + b.height));

    return {
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY,
    };
  }

  addBox(): void {
    const rect = new Konva.Rect({
      x: 100,
      y: 100,
      width: 100,
      height: 100,
      fill: 'lightblue',
      strokeWidth: 0,
      draggable: true,
      name: 'box',
    });

    const magnetDistance = 10;

    // Guarda última posição válida para rollback (atualizado em dragstart)
    rect.setAttr('lastPosition', { x: rect.x(), y: rect.y() });

    rect.on('dragstart', () => {
      // Salva a posição inicial de cada quadrado no grupo para referência do movimento
      const targets = this.selectedShapes.length > 1 ? this.selectedShapes : [rect];
      targets.forEach(shape => {
        shape.setAttr('startPosition', { x: shape.x(), y: shape.y() });
      });
    });

    rect.on('dragmove', () => {
      if (!this.magnetismoAtivo) return;

      const targets = this.selectedShapes.length > 1 ? this.selectedShapes : [rect];
      // Caixa do grupo inteiro (pode ser o transformer se múltiplos)
      const groupBox = this.selectedShapes.length > 1
        ? this.transformer.getClientRect()
        : rect.getClientRect();

      const groupCenterX = groupBox.x + groupBox.width / 2;
      const groupCenterY = groupBox.y + groupBox.height / 2;

      let deltaX = 0;
      let deltaY = 0;

      this.layer.find('Rect').forEach(node => {
        if (targets.includes(node as Konva.Rect)) return;

        const otherRect = node as Konva.Rect;
        const otherBox = otherRect.getClientRect();
        const otherCenterX = otherBox.x + otherBox.width / 2;
        const otherCenterY = otherBox.y + otherBox.height / 2;

        if (Math.abs(groupCenterX - otherCenterX) < magnetDistance) {
          deltaX = otherCenterX - groupCenterX;
        }

        if (Math.abs(groupCenterY - otherCenterY) < magnetDistance) {
          deltaY = otherCenterY - groupCenterY;
        }
      });

      // Calcula o movimento total do grupo (delta baseado na posição inicial)
      targets.forEach(shape => {
        const startPos = shape.getAttr('startPosition');
        if (!startPos) return;

        shape.position({
          x: startPos.x + rect.x() - rect.getAttr('startPosition')?.x + deltaX,
          y: startPos.y + rect.y() - rect.getAttr('startPosition')?.y + deltaY,
        });
      });

      // Função para colisão
      const isIntersecting = (r1: { x: number, y: number, width: number, height: number }, r2: { x: number, y: number, width: number, height: number }): boolean => {
        return !(
          r1.x + r1.width < r2.x ||
          r1.x > r2.x + r2.width ||
          r1.y + r1.height < r2.y ||
          r1.y > r2.y + r2.height
        );
      };

      // Verifica colisões após o movimento
      const hasCollision = targets.some(shape => {
        const shapeBox = shape.getClientRect();

        return this.layer.find('Rect').some(otherNode => {
          const otherShape = otherNode as Konva.Rect;
          if (targets.includes(otherShape)) return false;

          const otherBox = otherShape.getClientRect();
          return isIntersecting(shapeBox, otherBox);
        });
      });

      if (hasCollision) {
        // Reverte para última posição válida
        targets.forEach(shape => {
          const lastPos = shape.getAttr('lastPosition');
          if (lastPos) {
            shape.position(lastPos);
          }
        });
      } else {
        // Atualiza última posição válida
        targets.forEach(shape => {
          shape.setAttr('lastPosition', { x: shape.x(), y: shape.y() });
        });
      }

      this.layer.batchDraw();
    });

    rect.setAttrs({
      customData: {
        id: crypto.randomUUID(),
        nome: 'Sala Padrão',
        tipo: 'Genérico',
        observacao: 'Clique para editar',
      }
    });

    rect.on('click', (e) => {
      if (e.evt.shiftKey) {
        if (this.selectedShapes.includes(rect)) {
          this.selectedShapes = this.selectedShapes.filter(r => r !== rect);
        } else {
          this.selectedShapes.push(rect);
        }
      } else {
        this.selectedShapes = [rect];
        this.selectedShape = rect;
        this.updateFormWithSelectedShape();
      }

      this.updateTransformer();
      this.layer.draw();
    });

    this.layer.add(rect);
    this.layer.draw();
  }

  onImageSelect(event: Event): void {
    if (this.selectedShapes.length === 0) return;

    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Selecione um arquivo de imagem válido.');
      input.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result as string;
      img.onload = () => {
        this.selectedShapes.forEach((rect) => {
          rect.fillPatternImage(img);
          rect.fillPatternRepeat('no-repeat');
          rect.fillPatternScale({
            x: rect.width() / img.width,
            y: rect.height() / img.height,
          });
        });
        this.layer.draw();
        input.value = ''; // limpa para novo upload
      };
    };
    reader.readAsDataURL(file);
  }



  deleteSelected(): void {
    if (this.selectedShapes.length > 0) {
      this.selectedShapes.forEach(shape => shape.destroy());
      this.selectedShapes = [];
      this.transformer.nodes([]);
      this.layer.draw();
    } else {
      console.log('Nenhum quadrado selecionado.');
    }
  }


  logSelectedInfo(): void {
    const transformers = this.layer.find('Transformer') as Konva.Transformer[];

    if (transformers.length === 0) {
      console.log('Nenhum quadrado selecionado.');
      return;
    }

    const selectedNodes = transformers[0].nodes(); // Assume um único Transformer para múltiplos selecionados

    selectedNodes.forEach((node, index) => {
      const { x, y, width, height, fill } = node.attrs;
      const customData = node.getAttr('customData') || {};

      console.log(`Quadrado ${index + 1}:`, {
        x,
        y,
        width,
        height,
        fill,
        customData
      });
    });
  }

  form = new FormGroup({
    nome: new FormControl(''),
    tipo: new FormControl(''),
    observacao: new FormControl('')
  });

  updateFormWithSelectedShape(): void {
    const shape = this.selectedShapes[0];
    const custom = shape.getAttr('customData') || {};
    this.form.patchValue({
      nome: custom.nome || '',
      tipo: custom.tipo || '',
      observacao: custom.observacao || ''
    });
  }

  aplicarEdicao(): void {
    if (this.selectedShapes.length !== 1) return;
    const shape = this.selectedShapes[0];
    shape.setAttr('customData', {
      ...shape.getAttr('customData'),
      ...this.form.value
    });
    this.layer.batchDraw();
  }



}