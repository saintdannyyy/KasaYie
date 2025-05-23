import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Colors from '@/constants/Colors';
import { Send, Copy, Share2 } from 'lucide-react-native';
import * as Clipboard from 'expo-clipboard';
import * as Share from 'expo-sharing';
import SpeechInterface from '@/components/SpeechInterface';

export default function HomeScreen() {
  const [transcription, setTranscription] = useState('');

  const handleCopy = async () => {
    await Clipboard.setStringAsync(transcription);
  };

  const handleShare = async () => {
    try {
      await Share.shareAsync(transcription);
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.title}>Transcribe</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.transcriptionContainer}>
          <TextInput
            style={styles.transcriptionInput}
            multiline
            placeholder="Your transcription will appear here..."
            value={transcription}
            onChangeText={setTranscription}
            placeholderTextColor={Colors.gray[400]}
          />
          
          {transcription ? (
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.actionButton} onPress={handleCopy}>
                <Copy color={Colors.primary[500]} size={24} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
                <Share2 color={Colors.primary[500]} size={24} />
              </TouchableOpacity>
            </View>
          ) : null}
        </View>

        <View style={styles.controls}>
          <SpeechInterface onTranscriptionResult={setTranscription} />
          
          {transcription ? (
            <TouchableOpacity style={styles.sendButton}>
              <Send color={Colors.white} size={24} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
    backgroundColor: Colors.white,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: Colors.primary[700],
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  transcriptionContainer: {
    height: 200,
    backgroundColor: Colors.gray[100],
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  transcriptionInput: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.gray[800],
    textAlignVertical: 'top',
    maxHeight: 140,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
    gap: 16,
  },
  actionButton: {
    padding: 8,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    marginTop: 'auto',
    paddingBottom: 16,
  },
  sendButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});