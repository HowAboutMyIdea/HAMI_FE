'use client';

import { useState } from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { useServerInsertedHTML } from 'next/navigation';
import GlobalStyle from '@/style/GlobalStyle';

export default function Providers({
    children,
}: {
    children: React.ReactNode;
}) {
    const [cache] = useState(() => {
        const cache = createCache({ key: 'css' });
        cache.compat = true;
        return cache;
    });

    useServerInsertedHTML(() => {
        return (
            <style
                data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(' ')}`}
                dangerouslySetInnerHTML={{
                    __html: Object.values(cache.inserted).join(' '),
                }}
            />
        );
    });

    return (
        <CacheProvider value={cache}>
            <GlobalStyle />
            {children}
        </CacheProvider>
    );
}