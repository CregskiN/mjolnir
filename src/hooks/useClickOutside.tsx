import { RefObject, useEffect } from 'react';

function useClickOutside(ref: RefObject<HTMLElement>, handler: Function) {
    useEffect(() => {
        const listener = (event: MouseEvent) => {
            if (!ref.current || ref.current.contains(event.target as HTMLElement)) {
                // !ref有存储 || ref存储的DOM树下存在点击事件触发的DOM => 点击事件发生在ref内
                return;
            }
            // 点击事件发生在ref外
            handler(event);
        }
        document.addEventListener('click', listener);

        return () => {
            document.removeEventListener('click', listener);
        }
    }, [ref, handler]);

}

export default useClickOutside;