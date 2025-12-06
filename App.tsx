import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { ScreenLanding } from './components/ScreenLanding';
import { ScreenColor } from './components/ScreenColor';
import { ScreenAdjective } from './components/ScreenAdjective';
import { ScreenResult } from './components/ScreenResult';
import { AppStep, Participant, UserConfig } from './types';
import { getOrInitAssignments, getUserConfig, saveUserConfig } from './utils';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>(AppStep.LANDING);
  const [currentUser, setCurrentUser] = useState<Participant | null>(null);
  const [tempConfig, setTempConfig] = useState<Partial<UserConfig>>({});
  const [finalConfig, setFinalConfig] = useState<UserConfig | null>(null);

  // Initialize assignments once on mount (idempotent due to localStorage check inside)
  useEffect(() => {
    getOrInitAssignments();
  }, []);

  const handleUserSelect = (name: Participant) => {
    setCurrentUser(name);
    const existingConfig = getUserConfig(name);

    if (existingConfig) {
      // Restore state and go to result
      setFinalConfig(existingConfig);
      setCurrentStep(AppStep.RESULT);
    } else {
      // Start flow
      setCurrentStep(AppStep.DRAW_COLOUR);
    }
  };

  const handleColorSelect = (colour: string) => {
    setTempConfig(prev => ({ ...prev, colour }));
    setCurrentStep(AppStep.DRAW_ADJECTIVE);
  };

  const handleAdjectiveSelect = (adjective: string) => {
    if (!currentUser || !tempConfig.colour) return;

    const newConfig: UserConfig = {
      colour: tempConfig.colour,
      adjective
    };

    // Persist
    saveUserConfig(currentUser, newConfig);
    setFinalConfig(newConfig);
    setCurrentStep(AppStep.RESULT);
  };

  const renderContent = () => {
    switch (currentStep) {
      case AppStep.LANDING:
        return <ScreenLanding onSelectUser={handleUserSelect} />;
      
      case AppStep.DRAW_COLOUR:
        return <ScreenColor onColorSelected={handleColorSelect} />;
      
      case AppStep.DRAW_ADJECTIVE:
        return <ScreenAdjective onAdjectiveSelected={handleAdjectiveSelect} />;
      
      case AppStep.RESULT:
        if (!currentUser || !finalConfig) return null;
        return <ScreenResult currentUser={currentUser} userConfig={finalConfig} />;
      
      default:
        return null;
    }
  };

  return (
    <Layout>
      {renderContent()}
    </Layout>
  );
};

export default App;