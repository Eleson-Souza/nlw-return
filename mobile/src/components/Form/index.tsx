import React, { useState } from 'react';
import { 
  View,
  TextInput,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';
import { ArrowLeft } from 'phosphor-react-native';
import { captureScreen } from 'react-native-view-shot';
import * as FileSystem from 'expo-file-system';

import { styles } from './styles';
import { theme } from '../../theme';
import { FeedbackType } from '../../components/Widget';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { ScreenshotButton } from '../ScreenshotButton';
import { Button } from '../Button';
import { api } from '../../libs/api';

interface Props {
  feedbackType: FeedbackType;
  onFeedbackCancelled: () => void;
  onFeedbackSent: () => void;
}

export function Form({ feedbackType, onFeedbackCancelled, onFeedbackSent }: Props) {
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState('');

  const feedbackTypeInfo = feedbackTypes[feedbackType];

  function handleScreenshot() {
    captureScreen({
        format: 'jpg',
        quality: 0.8
    })
        .then(uri => setScreenshot(uri))
        .catch(error => console.log(error))
  }

  function handleScreenshotRemove() {
      setScreenshot(null);
  }

  async function handleSendFeedback() {
      if (isSendingFeedback) {
          return;
      }

      setIsSendingFeedback(true);

      const screenshotBase64 = screenshot && await FileSystem.readAsStringAsync(screenshot, { encoding: 'base64' });

      try {
          await api.post('/feedbacks', {
              type: feedbackType,
              screenshot: `data:image/png;base64, ${screenshotBase64}`,
              comment
          });

          onFeedbackSent();

      } catch (error) {
          console.log(error);
          setIsSendingFeedback(false);
      }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.header}
        onPress={onFeedbackCancelled}
      >
        <ArrowLeft 
          size={24}
          weight="bold"
          color={theme.colors.text_secondary}
        />

        <View style={styles.titleContainer}>
          <Image
            source={feedbackTypeInfo.image}
            style={styles.image}
          />
          <Text style={styles.titleText}>
            {feedbackTypeInfo.title}
          </Text>
        </View>
      </TouchableOpacity>

      <TextInput 
        multiline
        style={styles.input}
        placeholder="Diga e detalhes qual problema está ocorrendo..."
        placeholderTextColor={theme.colors.text_secondary}
        onChangeText={setComment}
      />

      <View style={styles.footer}>
        <ScreenshotButton
          onTakeShot={handleScreenshot}
          onRemoveShot={handleScreenshotRemove}
          screenshot={screenshot}
        />
        <Button 
          onPress={handleSendFeedback}
          isLoading={isSendingFeedback}
        />
      </View>
    </View>
  );
}