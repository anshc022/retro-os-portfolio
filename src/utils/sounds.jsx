// src/utils/sounds.js
import useSound from 'use-sound';
import openSound from '../assets/sfx/mouse-click.mp3';
import clickSound from '../assets/sfx/mouse-click.mp3';
import closeSound from '../assets/sfx/mouse-click.mp3';

const useRetroSounds = () => {
  const [playOpen] = useSound(openSound);
  const [playClick] = useSound(clickSound);
  const [playClose] = useSound(closeSound);

  return { playOpen, playClick, playClose };
};

export default useRetroSounds;
