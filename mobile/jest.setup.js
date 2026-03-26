jest.mock('react-native-encrypted-storage', () => ({
    default: {
        setItem: async () => null,
        getItem: async () => null,
        removeItem: async () => null,
        clear: async () => null,
    },
}));
