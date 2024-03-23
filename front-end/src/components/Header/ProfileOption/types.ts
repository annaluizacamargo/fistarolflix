export interface IProfileOption {
  modalOpen: boolean
  setModalOpen: (value: boolean) => void
  activeUserName: string
  invert?: boolean
}

export interface IProfileOptionModal {
  modalOpen: boolean
  setModalOpen: (value: boolean) => void
  UserName: string
  emailUser: string
}
