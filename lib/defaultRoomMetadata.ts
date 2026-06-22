export type DashboardRoomSettings = {
    roomTitle: string
    waitingRoom: boolean
    muteOnEntry: boolean
    allowGuests: boolean
  }
  
  export const buildRoomMetadata = (settings: DashboardRoomSettings) => ({
    // Use protobuf JSON field names (lowerCamelCase) to ensure Go protojson unmarshal
    // correctly populates nested messages (otherwise server defaults can disable features).
    roomTitle: settings.roomTitle,
    welcomeMessage: "",
    parentRoomId: "",
    isBreakoutRoom: false,
    roomFeatures: {
      allowWebcams: true,
      muteOnStart: settings.muteOnEntry,
      allowScreenShare: true,
      allowRtmp: true,
      allowViewOtherWebcams: true,
      allowViewOtherUsersList: true,
      adminOnlyWebcams: false,
      enableAnalytics: false,
      allowVirtualBg: true,
      allowRaiseHand: true,
      recordingFeatures: {
        isAllow: true,
        isAllowCloud: true,
        enableAutoCloudRecording: false,
        isAllowLocal: true,
        onlyRecordAdminWebcams: false,
      },
      chatFeatures: {
        allowChat: true,
        allowFileUpload: true,
        allowedFileTypes: [],
        maxFileSize: 0,
      },
      sharedNotePadFeatures: { allowedSharedNotePad: true, isActive: false, visible: false },
      whiteboardFeatures: { allowedWhiteboard: true, visible: false },
      externalMediaPlayerFeatures: { allowedExternalMediaPlayer: true, isActive: false },
      waitingRoomFeatures: {
        isActive: settings.waitingRoom,
        waitingRoomMsg: "",
      },
      breakoutRoomFeatures: { isAllow: true, isActive: false, allowedNumberRooms: 6 },
      displayExternalLinkFeatures: { isAllow: true, isActive: false },
      ingressFeatures: { isAllow: false },
      speechToTextTranslationFeatures: {
        isAllow: false,
        isAllowTranslation: false,
        isEnabled: false,
        isEnabledTranslation: false,
        maxNumTranLangsAllowSelecting: 0,
        allowedSpeechLangs: [],
        allowedSpeechUsers: [],
        allowedTransLangs: [],
      },
      endToEndEncryptionFeatures: {
        isEnabled: false,
        includedChatMessages: false,
        includedWhiteboard: false,
        enabledSelfInsertEncryptionKey: false,
      },
      pollsFeatures: { isAllow: true, isActive: false },
    },
    defaultLockSettings: {
      lockMicrophone: false,
      lockWebcam: false,
      lockScreenSharing: false,
      lockChat: false,
      lockChatSendMessage: false,
      lockChatFileShare: false,
      lockPrivateChat: false,
      lockWhiteboard: false,
      lockSharedNotepad: false,
    },
    copyrightConf: {
      display: true,
      text: 'Powered by <a href="https://www.wemeet.org" target="_blank">WeMeet</a>',
    },
    extraData: JSON.stringify({
      allowGuests: settings.allowGuests,
    }),
  })