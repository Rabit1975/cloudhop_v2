// CloudHop icon constants — re-exports lucide-react icons used across AI and Call components

export {
  Bot as AI,
  Mic,
  Video,
  FlipHorizontal as FlipCamera,
  PictureInPicture2 as PictureInPicture,
  PhoneOff,
} from 'lucide-react';

// Grouped Icons object for components that import { Icons }
import {
  Bot,
  Mic,
  Video,
  FlipHorizontal,
  PictureInPicture2,
  PhoneOff,
} from 'lucide-react';

export const Icons = {
  AI: Bot,
  Mic,
  Video,
  FlipCamera: FlipHorizontal,
  PictureInPicture: PictureInPicture2,
  PhoneOff,
};
