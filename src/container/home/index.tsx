import * as _ from './style';
import Image from 'next/image';

export default function Home() {
    return (
        <_.Contaienr>
            <Image src="/BG.gif" alt="background image" width={2000} height={1080} style={{ overflowY: 'auto', opacity: 0.5 }} />
        </_.Contaienr>
    );
}