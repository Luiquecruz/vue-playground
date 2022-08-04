import { ref } from 'vue';

export default function() {
    const isMatching = ref<boolean>(false);

    // NOTE: use below functions inside onMounted() lifecycle to make it work properly.
    const checkGreaterThan = (viewport: number | string) => {
        if (window.innerWidth >= viewport) {
            isMatching.value = true;
        }
    };

    const checkLessThan = (viewport: number | string) => {
        if (window.innerWidth <= viewport) {
            isMatching.value = true;
        }
    };

    return {
        isMatching,
        checkGreaterThan,
        checkLessThan,
    }
};
