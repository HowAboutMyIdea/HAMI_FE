"use client";

import * as S from './style';

export default function Landing() {

    return (
        <S.Contaienr>
            <S.TextGroup>
                <S.Title>아이디어를 적어보세요</S.Title>
                <S.SubTitle placeholder="창의적인 아이디어를 보여주세요" />
            </S.TextGroup>
        </S.Contaienr>
    );
}