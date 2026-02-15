import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HopSpace, HopSpaceType, HopSpaceMood } from '../../hopspaces/utils/types';

interface SpaceCreationWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: { name: string; type: HopSpaceType; mood: HopSpaceMood }) => void;
}

const SpaceCreationWizard: React.FC<SpaceCreationWizardProps> = ({ 
  isOpen, 
  onClose, 
  onCreate 
}) => {
  const [spaceData, setSpaceData] = useState({
    name: '',
    type: 'fluid_art' as HopSpaceType,
    mood: 'calm' as HopSpaceMood,
  });

  const handleClose = () => {
    setSpaceData({
      name: '',
      type: 'fluid_art',
      mood: 'calm',
    });
    onClose();
  };
