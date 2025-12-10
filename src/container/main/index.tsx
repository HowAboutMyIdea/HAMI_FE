"use client";

import * as S from './style';

export default function Landing() {

    return (
        <S.Contaienr>
            <S.TextGroup>
                <S.Title>아이디어를 적어보세요</S.Title>
                <S.SubTitle placeholder="아이디어를 적은 후 Enter를 눌러주세요" />
            </S.TextGroup>
        </S.Contaienr>
    );
}