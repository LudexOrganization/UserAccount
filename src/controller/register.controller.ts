import { Request } from 'express';
import { sendVerificationEmail, verifyEmailCode} from '../service/email.service';
import { registerUser } from '../service/register.service';
import {VerifyEmailCodeDto} from "../dto/verifyEmailCode.dto";
import {RegisterRequestDto} from "../dto/registerRequest.dto"

export const sendVerifyEmailControl = async (req: Request,) => {
    const { email } = req.body;
    try {
        await sendVerificationEmail(email);
    }catch(err){
        throw err;
    }

};

export const getVerifyEmailCodeControl = async (req: Request,): Promise<boolean> => {
    const verifyEmailCodeDto = req.body as VerifyEmailCodeDto;
    try {
        return verifyEmailCode(verifyEmailCodeDto);
    }
    catch(err){
        throw err;
    }
};

//이메일 인증이 끝난 회원이 회원가입 버튼을 눌렀을때 작동하도록 할 함수입니다.
export const completeRegisterControl = async (req: Request,): Promise<void> => {
    const registerRequestDto = req.body as RegisterRequestDto;

    if (registerRequestDto.password !== registerRequestDto.repeatPassword) {
        throw new Error('비밀번호가 일치하지 않습니다.')
    }
    try {
        await registerUser(registerRequestDto);  // 비밀번호와 함께 사용자 데이터 DB에 등록
    } catch(err){
        throw err;
    }
};