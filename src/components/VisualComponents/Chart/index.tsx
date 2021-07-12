import { Chart } from '@antv/f2';
import { FC, memo, useEffect, useRef } from 'react';

interface IChartProps {
  data: Array<{ name: string; value: number }>;
}

const FChart: FC<IChartProps> = (props) => {
  const chartElRef = useRef(null);
  const data = props.data;

  useEffect(() => {
    let chart = new Chart({
      el: chartElRef.current || undefined,
      pixelRatio: window.devicePixelRatio,
    });

    const dataX = data.map((item) => ({
      ...item,
      value: Number(item.value),
    }));

    chart.source(dataX);
    chart.interval().position('name*value').color('name');

    chart.render();

    return () => chart.destroy();
  }, [data]);

  return <canvas ref={chartElRef} style={{ width: '100%' }}></canvas>;
};

export default memo(FChart);
