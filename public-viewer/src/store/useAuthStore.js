import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * useAuthStore - Global auth state using Zustand
 *
 * Copied verbatim from Erp/Frontend/src/store/useAuthStore.js so
 * axiosInstance.js works unmodified. This app never logs anyone in —
 * token/user/isAuthenticated stay at their defaults for every visitor,
 * kept only because axiosInstance.js expects the shape to exist.
 *
 * persist middleware saves to sessionStorage so the user stays
 * logged in on refresh but is cleared when the browser tab closes.
 */
const useAuthStore = create(
  persist(
    (set) => ({
      // State
      token: null,
      user: null,           // { userId, companyName, orgId }
      isAuthenticated: false,
      activeOrg: null,      // { _id, name, description, role }
      organizations: [],    // list of { _id, name, role, ... }
      notifications: [],    // list of Notification objects
      unreadCount: 0,

      // Actions
      setAuth: (token, user, organizations) => set(() => {
        const orgs = Array.isArray(organizations) ? organizations : []
        return {
          token,
          user,
          isAuthenticated: true,
          organizations: orgs,
          activeOrg: orgs.length > 0 ? orgs[0] : null,
        }
      }),

      clearAuth: () => set({
        token: null,
        user: null,
        isAuthenticated: false,
        activeOrg: null,
        organizations: [],
        notifications: [],
        unreadCount: 0,
      }),

      setNotifications: (notifs) => set({
        notifications: notifs,
        unreadCount: notifs.filter((n) => !n.read).length,
      }),

      addNotification: (notif) => set((state) => ({
        notifications: [notif, ...state.notifications],
        unreadCount: state.unreadCount + 1,
      })),

      markAllNotificationsRead: () => set((state) => ({
        notifications: state.notifications.map((n) => ({ ...n, read: true })),
        unreadCount: 0,
      })),

      removeNotification: (id) => set((state) => {
        const notif = state.notifications.find((n) => n._id === id)
        return {
          notifications: state.notifications.filter((n) => n._id !== id),
          unreadCount: notif && !notif.read ? Math.max(0, state.unreadCount - 1) : state.unreadCount,
        }
      }),

      updateUser: (updates) => set((state) => ({
        user: { ...state.user, ...updates }
      })),

      setActiveOrg: (org) => set({ activeOrg: org }),

      setOrganizations: (orgs) => set((state) => ({
        organizations: orgs,
        activeOrg: state.activeOrg || (orgs.length > 0 ? orgs[0] : null),
      })),
    }),
    {
      name: 'auth-storage',
      storage: {
        getItem: (name) => {
          const value = sessionStorage.getItem(name)
          return value ? JSON.parse(value) : null
        },
        setItem: (name, value) => {
          sessionStorage.setItem(name, JSON.stringify(value))
        },
        removeItem: (name) => {
          sessionStorage.removeItem(name)
        },
      },
    }
  )
)

export default useAuthStore
