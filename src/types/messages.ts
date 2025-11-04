export type MessageType =
  | 'TOGGLE_SIDEBAR'
  | 'GET_SIDEBAR_STATE'
  | 'SET_SIDEBAR_STATE'
  | 'GET_CANDIDATE_DATA'
  | 'SET_SELECTED_CANDIDATE'
  | 'PING';

export interface BaseMessage {
  type: MessageType;
}

export interface ToggleSidebarMessage extends BaseMessage {
  type: 'TOGGLE_SIDEBAR';
}

export interface GetSidebarStateMessage extends BaseMessage {
  type: 'GET_SIDEBAR_STATE';
}

export interface SetSidebarStateMessage extends BaseMessage {
  type: 'SET_SIDEBAR_STATE';
  payload: {
    isOpen: boolean;
  };
}

export interface GetCandidateDataMessage extends BaseMessage {
  type: 'GET_CANDIDATE_DATA';
}

export interface SetSelectedCandidateMessage extends BaseMessage {
  type: 'SET_SELECTED_CANDIDATE';
  payload: {
    candidateId: string;
  };
}

export interface PingMessage extends BaseMessage {
  type: 'PING';
}

export type ExtensionMessage =
  | ToggleSidebarMessage
  | GetSidebarStateMessage
  | SetSidebarStateMessage
  | GetCandidateDataMessage
  | SetSelectedCandidateMessage
  | PingMessage;

export interface MessageResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
