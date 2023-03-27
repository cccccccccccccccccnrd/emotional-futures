export interface Emoxy {
  id: string
  created_at: string
  updated_at: string
  user_id: string
  name: string
  bst: [number, number, number]
  friends: Array<string>
  r: number
}

export interface Activation {
  id: string
  created_at: string
  updated_at: string
  user_id: string
  friend_id?: string
  type: [number, number]
  accounts?: [Object, Object]
  results?: [Object, Object]
  status: 'created' | 'accepted' | 'completed'
}