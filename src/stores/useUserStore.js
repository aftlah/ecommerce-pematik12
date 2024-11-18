import { create } from 'zustand';

const useUserStore = create((set) => ({
    isLoggedIn: sessionStorage.getItem('isLoggedIn') === 'true',
    userLog: JSON.parse(sessionStorage.getItem('userLog')) || [],

    login: (user) => set((state) => {
        const updatedUserLog = [...state.userLog, user];
        sessionStorage.setItem('userLog', JSON.stringify(updatedUserLog));
        sessionStorage.setItem('isLoggedIn', 'true');
        return {
            userLog: updatedUserLog,
            isLoggedIn: true
        };
    }),

    logout: () => set(() => {
        sessionStorage.removeItem('userLog');
        sessionStorage.setItem('isLoggedIn', 'false');
        return {
            userLog: [],
            isLoggedIn: false
        };
    })
}));

export default useUserStore;
