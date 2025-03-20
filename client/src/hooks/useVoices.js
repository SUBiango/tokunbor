import { useQuery } from '@tanstack/react-query'
import ttsApi from '../utils/ttsApi'

const fetchVoices = async () => {
    const { data } = await ttsApi.get('/voices')
    return data.voices
}

export const useVoices = () => {
    return useQuery({
        queryKey: ['voices'],
        queryFn: fetchVoices
    })
};
