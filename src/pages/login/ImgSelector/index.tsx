import { useState, useCallback } from 'react';
import classnames from 'classnames';
import Avator_01 from '@/assets/avatar_01.png';
import Avator_02 from '@/assets/avatar_02.png';
import Avator_03 from '@/assets/avatar_03.png';
import Avator_04 from '@/assets/avatar_04.png';
import Avator_05 from '@/assets/avatar_05.png';
import Avator_06 from '@/assets/avatar_06.png';
import Avator_07 from '@/assets/avatar_07.png';
import Avator_08 from '@/assets/avatar_08.png';
import Avator_09 from '@/assets/avatar_09.png';
import './index.less';

const imgArr = [
  Avator_01,
  Avator_02,
  Avator_03,
  Avator_04,
  Avator_05,
  Avator_06,
  Avator_07,
  Avator_08,
  Avator_09,
];

interface ImgProps {
  value?: string;
  onChange?: (v: string) => void;
}

const ImgSelector = (props: ImgProps) => {
  const { onChange } = props;
  const [curSelected, setCurSelected] = useState(-1);
  const handleSelected = useCallback(
    (index: number) => {
      setCurSelected(index);
      onChange && onChange(imgArr[index]);
    },
    [onChange],
  );

  return (
    <div className="img-select-wrap">
      {imgArr.map((item, i) => (
        <div
          className={classnames(
            'img-select-item',
            curSelected === i && 'selected',
          )}
          onClick={() => handleSelected(i)}
          key={i}
        >
          <img src={item} alt="" key={i} />
        </div>
      ))}
    </div>
  );
};

export default ImgSelector;
