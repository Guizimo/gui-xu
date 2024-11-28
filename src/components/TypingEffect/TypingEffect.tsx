import React, { useState, useEffect } from 'react';
import { View } from '@tarojs/components';

interface TypingEffectProps {
  text: string; // 要展示的完整文字
  speed?: number; // 每个字符的打字速度（毫秒）
  delay?: number; // 完整文字显示后等待的时间（毫秒）
}

const TypingEffect: React.FC<TypingEffectProps> = ({ text, speed = 100, delay = 1000 }) => {
  const [displayedText, setDisplayedText] = useState(''); // 当前显示的文字
  const [isAdding, setIsAdding] = useState(true); // 当前是增加文字还是减少文字
  const [index, setIndex] = useState(0); // 当前显示到第几个字符

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!text) return

    if (isAdding) {
      if (index < text.length) {
        // 逐字增加
        timer = setTimeout(() => {
          setDisplayedText((prev) => prev + text[index]);
          setIndex((prev) => prev + 1);
        }, speed);
      } else {
        // 增加完成，等待一段时间后开始减少
        timer = setTimeout(() => {
          setIsAdding(false);
        }, delay);
      }
    } else {
      if (index > 0) {
        // 逐字减少
        timer = setTimeout(() => {
          setDisplayedText((prev) => prev.slice(0, -1));
          setIndex((prev) => prev - 1);
        }, speed);
      } else {
        // 减少完成，等待一段时间后重新开始
        timer = setTimeout(() => {
          setIsAdding(true);
        }, delay);
      }
    }

    return () => clearTimeout(timer); // 清除定时器
  }, [index, isAdding, text, speed, delay]);

  return <View>{displayedText}</View>;
};

export default TypingEffect;
