import { useMutation } from "@tanstack/react-query"
import ttsApi from "../utils/ttsApi"

const mutationKey = ['tts']

/**
 * Hook to perform a TTS conversion mutation
 *
 * @function useTtsMutation
 * @returns {Object} A mutation object with the following properties:
 *   - mutate: The mutation function
 *   - data: The data returned from the mutation
 *   - error: The error returned from the mutation
 *   - isLoading: A boolean indicating if the mutation is in progress
 *   - isSuccess: A boolean indicating if the mutation was successful
 *   - isError: A boolean indicating if the mutation failed
 */

export const useTtsMutation = () => {
    return useMutation({
        mutationKey,
        mutationFn: async (payload) => {
            const response = await ttsApi.post('/convert', payload)
            // console.log('Response:', response.data)
            return response.data
        }
    })
}