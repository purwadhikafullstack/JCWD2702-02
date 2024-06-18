'use client'
export const createUserSlice = (set: any) => ({
  users: null,
  createUsers: (payload: any) => {
    set({ users: payload })
  },
  removeUsers: () => {
    set({ users: null })
  },
})
