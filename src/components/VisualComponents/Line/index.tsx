import { memo, FC, useRef, useEffect } from 'react';
import { Chart } from '@antv/f2';

interface IChartProps {
  data: Array<{ name: string; value: number | string }>;
}

const FLine: FC<IChartProps> = (props) => {
  const { data } = props;
  const chartRef = useRef(null);
  useEffect(() => {
    const chart = new Chart({
      el: chartRef.current || undefined,
      pixelRatio: window.devicePixelRatio,
    });

    const dataX = data.map((item) => ({ ...item, value: Number(item.value) }));
    chart.source(dataX, { value: { tickCount: 1, min: 0 } });

    chart.tooltip({
      showCrosshairs: true,
      showItemMarker: false,
    });

    chart.axis('name', {
      label: function label(text, index, total) {
        const textCfg: any = {};
        if (index === 0) {
          textCfg.textAlign = 'left';
        } else if (index === total - 1) {
          textCfg.textAlign = 'right';
        }
        return textCfg;
      },
    });

    chart.line().position('name*value');
    chart.point().position('name*value').style({
      stroke: '#fff',
      lineWidth: 1,
    });
    chart.render();

    return () => chart.destroy();
  }, [data]);

  return <canvas ref={chartRef} style={{ width: '100%' }}></canvas>;
};

export default memo(FLine);
