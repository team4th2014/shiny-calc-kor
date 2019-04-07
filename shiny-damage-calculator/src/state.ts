// ステータス情報
export interface IStatus {
  vo: number
  da: number
  vi: number
}

// アピール対象
export type AppealTarget = 'vo' | 'da' | 'vi' | 'other';

// アプリケーション全体のState
export interface IAppState {
  pIdolStatus: IStatus,
  sIdolStatus: IStatus[]
  memorialOption: number,
  auditionWeek: number,
  buffValue: IStatus,
  appealTarget: AppealTarget,
  cardMultiple: number,
  pIdolName: string,
  sIdolName: string[]
}

// Stateの初期値
export const DEFAULT_STATE: IAppState = {
  pIdolStatus: {vo: 150, da: 150, vi: 550},
  sIdolStatus: [
    {vo: 138, da: 138, vi: 180},
    {vo: 164, da: 164, vi: 180},
    {vo: 125, da: 156, vi: 188},
    {vo: 118, da: 118, vi: 184}
  ],
  // tslint:disable-next-line:object-literal-sort-keys
  memorialOption: 2,
  auditionWeek: 33,
  buffValue: {vo: 0, da: 0, vi: 0},
  appealTarget: 'vi',
  cardMultiple: 20,
  pIdolName: '',
  sIdolName: ['', '', '', '']
}

// Actionの種類
export type ActionType = 'P_IDOL' | 'S_IDOL' | 'P_NAME' | 'S_NAME' | 'MEMORIAL' | 'WEEK' | 'BUFF' | 'TARGET' | 'CARD'

// Actionを表すinterface
export interface IAction {
  type: ActionType
  value: string
}
