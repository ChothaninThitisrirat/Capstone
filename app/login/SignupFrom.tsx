'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";

interface LoginProps {
    setStylesingup: (style: boolean) => void;
    setStylelogin: (style: boolean) => void;
    setRegisterSccuess: (style: string) => void;
}

const Login: React.FC<LoginProps> = ({
    setStylesingup,
    setStylelogin,
    setRegisterSccuess,
    }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [personalId, setPersonalId] = useState("");
    const [address, setAddress] = useState("");
    const [telNumber, setTelNumber] = useState("");
    const [infoPage, setInfoPage] = useState(true);
    const [checkSpecialChar, setCheckSpecialChar] = useState(false);
    const [classCheckPersonalId, setClassCheckPersonalId] = useState(false);
    const [checkCardIdUse, setCheckCardIdUse] = useState(false);
    const [checkTelUse, setCheckTelUse] = useState(false);
    const [classLeastCharacters, setClassLeastCharacters] = useState(
        "flex gap-1 text-gray-500 text-xs ml-5 mt-2"
    );
    const [classSpecialChar, setClassSpecialChar] = useState(
        "flex gap-1 text-gray-500 text-xs ml-5"
    );
    const [classCheckUsername, setClassCheckUsername] = useState(
        "invisible text-red-500 text-xs text-right"
    );
    const [classCheckEmail, setClassCheckEmail] = useState(
        "invisible text-red-500 text-xs text-right"
    );
    const [notMachPassword, setNotMachPassword] = useState(false);
    const [typePassword, setTypePassword] = useState("password");
    const [typeConfirmPassword, setTypeConfirmPassword] = useState("password");

    const router = useRouter();

    // api เช็ค Username และ Email ซ้ำ

    const CheckUsenameEmail = async (
        e: React.SyntheticEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        try {
        const response: any = await fetch("/api/auth/signup/1", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            redirect: false,
            username,
            email,
            }),
        });
        const responseData = await response.json();
        if (responseData.message === "Username and Email already exist.") {
            setClassCheckUsername("visible text-red-500 text-xs text-right");
            setClassCheckEmail("visible text-red-500 text-xs text-right");
        } else if (responseData.message === "Username already exist.") {
            setClassCheckUsername("visible text-red-500 text-xs text-right");
            setClassCheckEmail("invisible text-red-500 text-xs text-right");
        } else if (responseData.message === "Email already exist.") {
            setClassCheckUsername("invisible text-red-500 text-xs text-right");
            setClassCheckEmail("visible text-red-500 text-xs text-right");
        } else {
            setInfoPage(false);
            setTypePassword("password");
            setTypeConfirmPassword("password");
            setClassCheckUsername("invisible text-red-500 text-xs text-right");
            setClassCheckEmail("invisible text-red-500 text-xs text-right");
        }
        } catch (error) {
        console.log("error", error);
        }
    };

    const handleSubmitInfoPage1 = async (
        e: React.SyntheticEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        if (
        password === confirmPassword &&
        password.length >= 8 &&
        checkSpecialChar
        ) {
        setNotMachPassword(false);
        console.log("infoPage1", infoPage);
        CheckUsenameEmail(e);
        } else {
        setNotMachPassword(true);
        if (password === confirmPassword) {
            setNotMachPassword(false);
            console.log("password === confirmP", infoPage);
        }
        }
    };

    const handlePasswordChange = (e: any) => {
        const inputValue = e.target.value;
        setPassword(inputValue);
        const passwordLength = inputValue.length;
        if (passwordLength < 8) {
        setClassLeastCharacters("flex gap-1 text-gray-500 text-xs ml-5 mt-2");
        } else {
        setClassLeastCharacters("flex gap-1 text-green-500 text-xs ml-5 mt-2");
        }

        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

        if (specialCharRegex.test(inputValue)) {
        setClassSpecialChar("flex gap-1 text-green-500 text-xs ml-5");
        setCheckSpecialChar(true);
        } else {
        setClassSpecialChar("flex gap-1 text-gray-500 text-xs ml-5");
        setCheckSpecialChar(false);
        }
    };

    const handlePersonalIdChange = (e: any) => {
        const inputValue = e.target.value;
        setPersonalId(inputValue);
        if (inputValue.length === 13) {
        setClassCheckPersonalId(true);
        } else {
        setClassCheckPersonalId(false);
        }
    };
    const handleSubmit = async (e: any) => {
        if (classCheckPersonalId) {
        e.preventDefault();
        try {
            const response = await fetch("/api/auth/signup/2", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                redirect: false,
                username,
                email,
                password,
                first_name: firstName,
                last_name: lastName,
                card_id: personalId,
                address: [address],
                phone_number: telNumber,
            }),
            });
            const responseData = await response.json();
            console.log(responseData.message);
            if (responseData.message === "Signup successfully") {
            setRegisterSccuess(
                "fixed z-20 w-64 h-12 text-white text-center flex items-center justify-center top-0 left-0 right-0 mx-auto mt-5 rounded-lg drop-shadow-lg duration-500 visible"
            );
            setCheckCardIdUse(false);
            setCheckTelUse(true);
            handleStyle();
            setFormSignup();
            setTimeout(() => {
                setRegisterSccuess(
                "fixed z-20 w-64 h-12 text-white text-center flex items-center justify-center top-0 left-0 right-0 mx-auto mt-5 rounded-lg drop-shadow-lg duration-500 -translate-y-20 invisible"
                );
            }, 4000);
            } else if (
            responseData.message === "ID Card and Phone number already exist."
            ) {
            setCheckCardIdUse(true);
            setCheckTelUse(true);
            } else if (responseData.message === "ID Card already exist.") {
            setCheckCardIdUse(true);
            setCheckTelUse(false);
            } else if (responseData.message === "Phone number already exist.") {
            setCheckCardIdUse(false);
            setCheckTelUse(true);
            }
        } catch (error) {
            console.log("error", error);
        }
        }
    };

    const handleStyle = () => {
        setTypePassword("password");
        setTypeConfirmPassword("password");
        setStylesingup(false);
        setStylelogin(true);
        setClassCheckPersonalId(false);
        setTimeout(() => {
            setFormSignup();
        }, 2000);
    };

    const setFormSignup = () => {
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setFirstName("");
        setLastName("");
        setPersonalId("");
        setAddress("");
        setTelNumber("");
        setInfoPage(true);
        setClassSpecialChar("flex gap-1 text-gray-500 text-xs ml-5");
        setClassLeastCharacters("flex gap-1 text-gray-500 text-xs ml-5 mt-2");
    };

    return (
        <>
        {infoPage ? (
            <>
            <form
                onSubmit={(e) => handleSubmitInfoPage1(e)}
                style={{ width: "500px" }}
                className="w-auto px-10 pt-10 pb-5 rounded-3xl shadow-md bg-white border border-gray-300 flex-col"
            >
                <div className="max-w-96 w-screen text-4xl font-bold">Sign up</div>
                <div className=" text-gray-400 mt-4 ml-4">สร้างบัญชีผู้ใช้</div>

                <div className="flex relative mb-4">
                <Icon
                    icon="ph:user"
                    width="30"
                    height="30"
                    style={{ color: "#A7A7A7" }}
                    className=" absolute bottom-2 left-1"
                />
                <input
                    id="username"
                    type="text"
                    value={username}
                    placeholder="username"
                    onChange={(e) => setUsername(e.target.value)}
                    maxLength={20}
                    required
                    className="w-full border-b border-gray-400 pl-12 py-2 mt-5 "
                />
                </div>

                <div className={classCheckUsername}>Username already exist.</div>

                <div className="flex relative mb-4">
                <Icon
                    icon="carbon:email"
                    width="30"
                    height="30"
                    style={{ color: "#A7A7A7" }}
                    className=" absolute bottom-2 left-1"
                />
                <input
                    id="emailSignup"
                    type="email"
                    value={email}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    maxLength={40}
                    required
                    className="w-full border-b border-gray-400 pl-12 py-2"
                />
                </div>

                <div className={classCheckEmail}>Email already exist.</div>

                <div className="flex relative mb-4">
                <Icon
                    icon="ph:lock"
                    width="28"
                    height="28"
                    style={{ color: "#A7A7A7" }}
                    className=" absolute bottom-2 left-1"
                />
                <input
                    id="passwordSignup"
                    type={typePassword}
                    value={password}
                    placeholder="Password"
                    onChange={(e) => handlePasswordChange(e)}
                    maxLength={20}
                    required
                    className="w-full border-b border-gray-400 pl-12 py-2 "
                />
                {typePassword === "password" ? (
                    <Icon
                    onClick={() => setTypePassword("text")}
                    icon="majesticons:eye-line"
                    width="25"
                    height="25"
                    className=" absolute bottom-1 right-1 text-gray-400"
                    />
                ) : (
                    <Icon
                    onClick={() => setTypePassword("password")}
                    icon="iconamoon:eye-off"
                    width="25"
                    height="25"
                    className=" absolute bottom-1 right-1 text-gray-400"
                    />
                )}
                </div>
                <span className={classSpecialChar}>
                {classSpecialChar === "flex gap-1 text-gray-500 text-xs ml-5" ? (
                    <>
                    <Icon
                        className="mt-1.5 ml-1"
                        icon="material-symbols:circle"
                        width="5"
                        height="5"
                    />
                    </>
                ) : (
                    <>
                    <Icon
                        icon="fluent:checkmark-16-filled"
                        width="15"
                        height="15"
                    />
                    </>
                )}
                Password must contain special characters.
                </span>
                <div className={classLeastCharacters}>
                {classLeastCharacters ===
                "flex gap-1 text-gray-500 text-xs ml-5 mt-2" ? (
                    <>
                    <Icon
                        className="mt-1.5 ml-1"
                        icon="material-symbols:circle"
                        width="5"
                        height="5"
                    />
                    </>
                ) : (
                    <>
                    <Icon
                        icon="fluent:checkmark-16-filled"
                        width="15"
                        height="15"
                    />
                    </>
                )}
                Least 8 Characters.
                </div>
                <div className="flex relative mb-4">
                <Icon
                    icon="ph:lock"
                    width="28"
                    height="28"
                    style={{ color: "#A7A7A7" }}
                    className=" absolute bottom-2 left-1"
                />
                <input
                    id="confirmPassword"
                    type={typeConfirmPassword}
                    value={confirmPassword}
                    placeholder="Confirm Password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    maxLength={20}
                    required
                    className="w-full border-b border-gray-400 pl-12 py-2 mt-2"
                />

                {typeConfirmPassword === "password" ? (
                    <Icon
                    onClick={() => setTypeConfirmPassword("text")}
                    icon="majesticons:eye-line"
                    width="25"
                    height="25"
                    className=" absolute bottom-1 right-1 text-gray-400"
                    />
                ) : (
                    <Icon
                    onClick={() => setTypeConfirmPassword("password")}
                    icon="iconamoon:eye-off"
                    width="25"
                    height="25"
                    className=" absolute bottom-1 right-1 text-gray-400"
                    />
                )}
                </div>
                {notMachPassword ? (
                <div className=" text-red-500 text-xs text-right">
                    Passwords don't match.
                </div>
                ) : (
                <div></div>
                )}
                <div className="flex items-center mt-10 justify-between">
                <span
                    onClick={handleStyle}
                    className="text-blue-400 text-xs cursor-pointer hover:underline"
                >
                    Already Have an Account?
                </span>
                <button
                    type="submit"
                    className="flex text-white p-1.5 rounded-full w-28 justify-center items-center gap-2 bg-dark2"
                >
                    NEXT
                    <Icon icon="carbon:next-outline" width="24" height="24" />
                </button>
                </div>
                <div className="flex gap-4 justify-center mt-16">
                <div
                    className=" w-3 h-3 rounded-full bg-dark1"
                ></div>
                <div className=" w-3 h-3 rounded-full bg-gray-300"></div>
                </div>
            </form>
            </>
        ) : (
            <>
            <form
                onSubmit={handleSubmit}
                style={{ width: "500px" }}
                className="w-auto px-10 pt-10 pb-5 rounded-3xl shadow-md bg-white border border-gray-300 flex-col duration-300"
            >
                <div className="max-w-96 w-screen text-4xl font-bold mt-2">
                Sign up
                </div>
                <div className=" text-gray-400 mt-4 ml-2">กรอกข้อมูลส่วนตัว</div>
                <div className="flex justify-between">
                <div className="flex relative mb-4 w-44">
                    <Icon
                    icon="mingcute:user-3-fill"
                    width="30"
                    height="30"
                    style={{ color: "#A7A7A7" }}
                    className=" absolute bottom-2 left-1"
                    />
                    <input
                    id="firstName"
                    type="text"
                    value={firstName}
                    placeholder="FirstName"
                    onChange={(e) => setFirstName(e.target.value)}
                    maxLength={20}
                    required
                    className="w-44 border-b border-gray-400 pl-12 py-2 mt-5 "
                    />
                </div>
                <div className="flex relative mb-4 w-44">
                    <Icon
                    icon="mingcute:user-3-fill"
                    width="30"
                    height="30"
                    style={{ color: "#A7A7A7" }}
                    className=" absolute bottom-2 left-1"
                    />
                    <input
                    id="lastName"
                    type="text"
                    value={lastName}
                    placeholder="LastName"
                    onChange={(e) => setLastName(e.target.value)}
                    maxLength={20}
                    required
                    className="w-44 border-b border-gray-400 pl-12 py-2 mt-5 "
                    />
                </div>
                </div>
                <div className="flex relative mb-4">
                <Icon
                    icon="material-symbols-light:id-card-outline"
                    width="30"
                    height="30"
                    style={{ color: "#A7A7A7" }}
                    className=" absolute bottom-2 left-1"
                />
                <input
                    id="personalId"
                    type="number"
                    value={personalId}
                    placeholder="Thai Personal ID"
                    onChange={(e) => handlePersonalIdChange(e)}
                    maxLength={13}
                    required
                    className="w-full border-b border-gray-400 pl-12 py-2 mt-5 "
                />
                {classCheckPersonalId ? (
                    <div className=" absolute bottom-1 right-0">
                    <Icon
                        icon="ei:check"
                        width="30"
                        height="30"
                        style={{ color: "#07AB07" }}
                    />
                    </div>
                ) : (
                    <div className=" absolute bottom-1 right-0 text-gray-400">
                    <Icon icon="ei:check" width="30" height="30" />
                    </div>
                )}
                </div>
                {checkCardIdUse ? (
                <div className=" text-red-500 text-xs text-right">
                    ID Card already exist.
                </div>
                ) : (
                <div></div>
                )}
                <div className="flex relative mb-4">
                <Icon
                    icon="prime:map-marker"
                    width="30"
                    height="30"
                    style={{ color: "#A7A7A7" }}
                    className=" absolute bottom-2 left-1"
                />
                <input
                    id="address"
                    type="text"
                    value={address}
                    placeholder="Address"
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    className="w-full border-b border-gray-400 pl-12 py-2 mt-5 "
                />
                </div>
                <div className="flex relative mb-4">
                <Icon
                    icon="mynaui:telephone"
                    width="30"
                    height="30"
                    style={{ color: "#A7A7A7" }}
                    className=" absolute bottom-2 left-1"
                />
                <input
                    id="telNumber"
                    type="number"
                    value={telNumber}
                    placeholder="Telephone Number"
                    onChange={(e) => setTelNumber(e.target.value)}
                    maxLength={10}
                    required
                    className="w-full border-b border-gray-400 pl-12 py-2 mt-5 "
                />
                </div>
                {checkTelUse ? (
                <div className=" text-red-500 text-xs text-right">
                    Phone number already exist.
                </div>
                ) : (
                <div></div>
                )}
                <div className="flex  mt-14 justify-between">
                <button onClick={() => setInfoPage(true)}>
                    <Icon
                    icon="fluent-mdl2:navigate-back"
                    width="40"
                    height="40"
                    className="text-dark2"
                    />
                </button>
                <button
                    type="submit"
                    className="flex text-white p-1.5 rounded-full w-24 justify-center items-center gap-2 bg-dark2"
                >
                    SIGN UP
                </button>
                </div>
                <div className="flex gap-4 justify-center mt-14">
                <div className=" w-3 h-3 rounded-full bg-gray-300"></div>
                <div
                    className=" w-3 h-3 rounded-full bg-dark1"
                ></div>
                </div>{" "}
            </form>
            </>
        )}
        </>
    );
};

export default Login;
