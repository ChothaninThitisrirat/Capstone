'use client'

import { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import HashLoader from "react-spinners/HashLoader";
import axios from "axios";

interface Category {
    id: string | number | null;
    name: string;
    defaultClass: boolean;
    color: string;
}
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
    const [loadingInfo, setLoadingInfo] = useState(false);
    const [loadingInfo2, setLoadingInfo2] = useState(false);
    const [loadingInfo2Bg, setLoadingInfo2Bg] = useState(false);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    // const [personalId, setPersonalId] = useState("");
    const [personalIdImg, setPersonalIdImg] = useState<File | null>(null);//
    const [address, setAddress] = useState("");
    const [telNumber, setTelNumber] = useState("");
    const [infoPage, setInfoPage] = useState(true); // true
    const [categoryLike, setCategoryLike] = useState(true); // true
    const [checkSpecialChar, setCheckSpecialChar] = useState(false);
    // const [classCheckPersonalId, setClassCheckPersonalId] = useState(false);
    // const [checkCardIdUse, setCheckCardIdUse] = useState(false);
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
            setTimeout(() => {
                setLoadingInfo(false);
            }, 2000);
        } else if (responseData.message === "Username already exist.") {
            setClassCheckUsername("visible text-red-500 text-xs text-right");
            setClassCheckEmail("invisible text-red-500 text-xs text-right");
            setTimeout(() => {
                setLoadingInfo(false);
            }, 1000);
        } else if (responseData.message === "Email already exist.") {
            setClassCheckUsername("invisible text-red-500 text-xs text-right");
            setClassCheckEmail("visible text-red-500 text-xs text-right");
            setTimeout(() => {
                setLoadingInfo(false);
            }, 1000);
        } else {
            setInfoPage(false);
            setTypePassword("password");
            setTypeConfirmPassword("password");
            setClassCheckUsername("invisible text-red-500 text-xs text-right");
            setClassCheckEmail("invisible text-red-500 text-xs text-right");
            setTimeout(() => {
                setLoadingInfo(false);
            }, 2000);
        }
        } catch (error) {
        console.log("error", error);
        }
    };

    const handleSubmitInfoPage1 = async (
        e: React.SyntheticEvent<HTMLFormElement>
    ) => {
        setLoadingInfo(true);
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
            }
            setTimeout(() => {
                setLoadingInfo(false);
            }, 2000);
            
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

    // const handlePersonalIdChange = (e: any) => {
    //     const inputValue = e.target.value;
    //     setPersonalId(inputValue);
    //     if (inputValue.length === 13) {
    //     setClassCheckPersonalId(true);
    //     } else {
    //     setClassCheckPersonalId(false);
    //     }
    // };

    const formData = new FormData();
    const handleSubmit = async (e: any) => {
        setLoadingInfo2Bg(true);
        setTimeout(() => {
            setLoadingInfo2(true);
        }, 100);
        
        e.preventDefault();
        if (personalIdImg !== null) {
            formData.append('username', username);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('first_name', firstName);
            formData.append('last_name', lastName);
            formData.append('card_id', personalIdImg); //---------------
            formData.append('address', address);
            formData.append('phone_number', telNumber);
            // formData.append('category', dataCatin);
            dataCatin.forEach((dataCatin) => {
                formData.append('category', dataCatin);
            });

            try {
                const response = await axios.post("/api/auth/signup/2", formData );
                
                const responseData = response.data
                console.log(responseData.message);
                if (responseData.message === "Signup successfully") {
                setRegisterSccuess(
                    "fixed z-20 w-64 h-12 text-white text-center flex items-center justify-center top-0 left-0 right-0 mx-auto mt-5 rounded-lg drop-shadow-lg duration-500 visible bg-dark1"
                );
                // setCheckCardIdUse(false);
                setCheckTelUse(true);
                handleStyle();
                setFormSignup();
                setLoadingInfo2(false);
                setLoadingInfo2Bg(false);
                setTimeout(() => {
                    setRegisterSccuess(
                    "fixed z-20 w-64 h-12 text-white text-center flex items-center justify-center top-0 left-0 right-0 mx-auto mt-5 rounded-lg drop-shadow-lg duration-500 -translate-y-20 invisible bg-dark1"
                    );
                }, 4000);
                } else if (
                responseData.message === "ID Card and Phone number already exist."
                ) {
                // setCheckCardIdUse(true);
                setCheckTelUse(true);
                setTimeout(() => {
                    setLoadingInfo2(false);
                    setLoadingInfo2Bg(false);
                }, 1000);
                } else if (responseData.message === "ID Card already exist.") {
                // setCheckCardIdUse(true);
                setCheckTelUse(false);
                setTimeout(() => {
                    setLoadingInfo2(false);
                    setLoadingInfo2Bg(false);
                }, 1000);
                } else if (responseData.message === "Phone number already exist.") {
                // setCheckCardIdUse(false);
                setCheckTelUse(true);
                setTimeout(() => {
                    setLoadingInfo2(false);
                    setLoadingInfo2Bg(false);
                }, 1000);
                }
            } catch (error) {
                console.log("error", error);
                setLoadingInfo2(false);
                setLoadingInfo2Bg(false);
            }
        }else{
            setLoadingInfo2(true);
            setLoadingInfo2Bg(false);
        }
    };

    const handleStyle = () => {
        setTypePassword("password");
        setTypeConfirmPassword("password");
        setStylesingup(false);
        setStylelogin(true);
        // setClassCheckPersonalId(false);
        setTimeout(() => {
            setFormSignup();
        }, 2000);
    };

    const setFormSignup = () => {
        setLoadingInfo(false)
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setFirstName("");
        setLastName("");
        // setPersonalId("");
        setPersonalIdImg(null);
        setAddress("");
        setTelNumber("");
        setInfoPage(true);
        setClassSpecialChar("flex gap-1 text-gray-500 text-xs ml-5");
        setClassLeastCharacters("flex gap-1 text-gray-500 text-xs ml-5 mt-2");
    };

    const [dataCatin, setDataCatin] = useState([])
    console.log('dataCatin', dataCatin)
    const [classCategory, setClassCategory] = useState("flex items-center justify-center rounded-lg w-32 h-8 text cursor-pointer py-0.5 px-3 flex-grow-4 duration-1000")
    const [category, setCategory] = useState<Category[]>([{
        id:null,
        name: "",
        defaultClass: true,
        color: "bg-gradient-to-tr from-novel to-white"
    },{
        id:null,
        name: "",
        defaultClass: true,
        color: "bg-gradient-to-tr from-horror1 to-horror2 text-white"
    },{
        id:null,
        name: "",
        defaultClass: true,
        color: "bg-gradient-to-tr from-cartoon to-white"
    },{
        id:null,
        name: "",
        defaultClass: true,
        color: "bg-gradient-to-tr from-romantic to-white"
    },{
        id:null,
        name: "",
        defaultClass: true,
        color: "bg-gradient-to-tr from-science to-white"
    },{
        id:null,
        name: "",
        defaultClass: true,
        color: "bg-gradient-to-tr from-business to-white"
    },{
        id:null,
        name: "",
        defaultClass: true,
        color: "bg-gradient-to-tr from-education to-white"
    },{
        id:null,
        name: "",
        defaultClass: true,
        color: "bg-gradient-to-tr from-travel to-white"
    },{
        id:null,
        name: "",
        defaultClass: true,
        color: "bg-gradient-to-tr from-develop to-white"
    },{
        id: null,
        name: "",
        defaultClass: true,
        color: "bg-gradient-to-tr from-health to-white"
    }])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<{ category: Category[] }>('/api/category');
                    const updatedCategories = response.data.category.map((item, index) => ({
                        id: item.id !== null ? item.id.toString() : null,
                        name: item.name,
                        defaultClass: category[index].defaultClass,
                        color:category[index].color 
                    }));
                    
                    setCategory(updatedCategories);
                
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPersonalIdImg(file);
            
        }
    };
console.log(personalIdImg)






    return (
        <>
        {infoPage ?(
            <>
            <form
                onSubmit={(e) => handleSubmitInfoPage1(e)}
                style={{ width: "500px" }}
                className="w-auto px-10 pt-10 pb-5 rounded-3xl shadow-md bg-white border border-gray-300 flex-col -translate-x-10 sm:translate-x-40 scale-75 sm:scale-100"
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
                Password must contain special characters. [ {'!@#$%^&*(),.?":{}|<>'} ]
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
                    className="flex text-white p-1.5 rounded-full w-28 justify-center items-center gap-2 bg-dark2 mt-1"
                >
                    NEXT
                    {loadingInfo 
                    ? <HashLoader
                    className="ml-1"
                    color='#fff' loading={loadingInfo} size={20} aria-label="Loading Spinner" data-testid="loader"/>
                    :<Icon icon="carbon:next-outline" width="24" height="24" />}
                    
                </button>
                </div>
                <div className="flex gap-4 justify-center mt-14 mb-1 translate-y-1">
                <div className=" w-3 h-3 rounded-full bg-dark1"></div>
                <div className=" w-3 h-3 rounded-full bg-gray-300"></div>
                <div className=" w-3 h-3 rounded-full bg-gray-300"></div>
                </div>
            </form>
            </>
        )  
        :(categoryLike 
            ? <>
            <div
            style={{ width: "500px" }}
            className="w-auto px-10 pt-10 pb-5 rounded-3xl shadow-md bg-white border border-gray-300 flex-col -translate-x-10 sm:translate-x-40 scale-75 sm:scale-100">
                <div className="max-w-96 w-screen text-4xl font-bold">Sign up</div>
                <div className=" text-gray-400 mt-4 ml-4">เลือกประเภทหนังที่คุณชื่นชอบ</div>

                <div 
                style={{ height: "332px" }}
                className="flex justify-center flex-col">
                    <div className="flex items-center gap-3 mt-10">
                        <Icon icon="iconamoon:category-light" width="40" height="40" />
                        <div className="flex w-0.5 h-9 bg-gray-400"></div>
                        <div className="flex text-gray-500">Category</div>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-3 mt-8">
                        {category.map((cate, index) => (
                            <div 
                            onClick={() => {
                                
                                const newCatin:any = [...dataCatin]
                                const ClassCatin:any = [...category]
                                if(newCatin.includes(cate.id)){
                                    ClassCatin.forEach((cat:any) => {
                                        if (cat.id === cate.id) {
                                            cat.defaultClass = true;
                                        }
                                    });
                                    newCatin.splice(newCatin.indexOf(cate.id),1)
                                }else{
                                    ClassCatin.forEach((cat:any) => {
                                        if (cat.id === cate.id) {
                                            cat.defaultClass = false;
                                        }
                                    });
                                    newCatin.push(cate.id)
                                }
                                setCategory(ClassCatin)
                                setDataCatin(newCatin)
                            }}
                            key={index} className={classCategory+' '+ (cate.defaultClass?"bg-gray-300":cate.color )}
                            >{cate.name}</div>
                        ))}
                    </div>
                    <div className={dataCatin.length > 1
                        ?"flex w-full mt-5 mb-3 duration-300 justify-end text-green-400 text-sm gap-1"
                        :"flex w-full mt-5 mb-3 duration-300 justify-end text-gray-400 text-sm gap-1"}>
                            {dataCatin.length > 1 ? (
                                <Icon
                                className="mt-1"
                                icon="fluent:checkmark-16-filled"
                                width="15"
                                height="15"
                            />
                        ) : (
                            <Icon
                                className="mt-2 ml-1"
                                icon="material-symbols:circle"
                                width="5"
                                height="5"
                            />
                        )}
                        เลือกอย่างน้อย 2 หมวดหมู่
                    </div>
                </div>
                <div className="flex items-center mt-6 justify-between">
                <button onClick={() => setInfoPage(true)}>
                    <Icon
                    icon="fluent-mdl2:navigate-back"
                    width="40"
                    height="40"
                    className="text-dark2"
                    />
                </button>
                <button 
                onClick={() => dataCatin.length > 1 ? setCategoryLike(false):null}
                className="flex text-white p-1.5 rounded-full w-28 justify-center items-center gap-2 bg-dark2">
                    NEXT
                    <Icon icon="carbon:next-outline" width="24" height="24" />
                    
                </button>
                </div>
                <div className="flex gap-4 justify-center mt-14">
                    <div className=" w-3 h-3 rounded-full bg-gray-300"></div>
                    <div className=" w-3 h-3 rounded-full bg-dark1"></div>
                    <div className=" w-3 h-3 rounded-full bg-gray-300"></div>
                </div>{" "}
            </div>
            </>
            :(
            <>
            <form
                onSubmit={handleSubmit}
                style={{ width: "500px" }}
                className="w-auto px-10 pt-10 pb-5 rounded-3xl shadow-md bg-white border border-gray-300 flex-col duration-300 -translate-x-10 sm:translate-x-40  scale-75 sm:scale-100"
            >
                <div className="max-w-96 w-screen text-4xl font-bold mt-2">
                Sign up
                </div>
                <div className=" text-gray-400 mt-4 ml-2">กรอกข้อมูลส่วนตัว</div>
                <div className="flex justify-between">
                <div className="flex relative mb-2 w-44">
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
                <div className="flex relative mb-2 w-44">
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
                
                <div className="flex relative mb-2">
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
                <div className="flex relative mb-2">
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


                <div className="flex relative">
                <Icon
                    icon="material-symbols-light:id-card-outline"
                    width="30"
                    height="30"
                    style={{ color: "#A7A7A7" }}
                    className=" absolute bottom-2 left-1"
                />
                <div className="w-full pl-12 py-2 mt-5 text-gray-400">ID Card</div>
                {/* <input
                    id="personalId"
                    type="number"
                    value={personalId}
                    placeholder="Thai Personal ID"
                    onChange={(e) => handlePersonalIdChange(e)}
                    maxLength={13}
                    required
                    className="w-full border-b border-gray-400 pl-12 py-2 mt-5 "
                /> */}

                {/* {classCheckPersonalId ? (
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
                )} */}
                </div>
                {/* {checkCardIdUse ? (
                <div className=" text-red-500 text-xs text-right">
                    ID Card already exist.
                </div>
                ) : (
                <div></div>
                )} */}
                <div className="flex w-full justify-center gap-5 mt-0.5 items-center">
                    <div className="flex border border-gray-400 rounded-3xl w-56 h-10 px-3 items-center text-gray-400 overflow-x-auto close-scrollbar">
                        {personalIdImg !== null ? personalIdImg.name :'No Flie Selected'}
                    </div>

                    <div 
                    className="flex bg-dark2 rounded-3xl w-24 h-8 text-white justify-center items-center relative cursor-pointer">
                        <input
                        type='file'
                        accept="image/*" 
                        onChange={handleFileChange}
                        className="bg-none border-none absolute w-24 rounded-3xl opacity-0 cursor-pointer"/>
                        Upload
                    </div>
                </div>


                
                <div className="flex mt-10 justify-between">
                <button onClick={() => setCategoryLike(true)}>
                    <Icon
                    icon="fluent-mdl2:navigate-back"
                    width="40"
                    height="40"
                    className="text-dark2"
                    />
                </button>
                
                <button
                    type="submit"
                    className={loadingInfo2Bg ?"flex text-white p-1.5 rounded-full w-32 justify-start items-center bg-dark2 duration-300 relative pl-4":"flex text-white p-1.5 rounded-full w-24 justify-start items-center bg-dark2 duration-300 pl-3.5 relative"}
                >
                    SIGN UP
                    
                </button>
                {loadingInfo2 ? (
                        <div className=" absolute right-14 bottom-24 -translate-y-1">
                            <HashLoader
                                className="ml-2"
                                color='#fff'
                                loading={loadingInfo2}
                                size={20}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />
                        </div>
                    ) : null}
                </div>
                <div className="flex gap-4 justify-center mt-14">
                <div className=" w-3 h-3 rounded-full bg-gray-300"></div>
                <div className=" w-3 h-3 rounded-full bg-gray-300"></div>
                <div className=" w-3 h-3 rounded-full bg-dark1"></div>
                </div>{" "}
            </form>
            </>
        ))}
        </>
    );
};

export default Login;
