import React, { useState , useEffect} from 'react';


function Login() {
    const [isloginChecked, setIsLoginChecked] = useState(false);
    const [islogined, setIsLogined] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [disabled, setDisabled] = useState(false);

    //** connected Callback */
    useEffect(() => {isLogined()}, []);

    /** ログインチェック */
    const isLogined = async function(){ 
        fetch('/api/isLogined',{credentials:'include'}).then((result) =>{
            setIsLoginChecked(true)
            setIsLogined(result.ok);
        })
    }

    /** アカウント作成 */
    const handleSignin = (event:any) =>{
        event.preventDefault();
        setDisabled(true);
        signup();


        async function signup () {
            const result = await fetch('/api/signup' 
            , {method : 'POST' 
                ,body : JSON.stringify({username, password})
                ,headers: {"Content-Type": "application/json"}
            });
            
            const json = await result.json()
            alert(json.message)
            setDisabled(false);
            // ログインする
            if (result.ok){
                handleLogin(event);
            }
        }

    }
    /** ログイン */
    const handleLogin = (event:any) => {
        event.preventDefault();
        setDisabled(true);
        // ログイン処理をここに書く
        signin();

        async function signin () {
            const result = await fetch('/api/login' 
            , {method : 'POST' 
                ,body : JSON.stringify({username, password})
                ,headers: {"Content-Type": "application/json"}
            }
            );
            
            // Cookies.set('loginToken', json.token);
            if (result.ok) {
                setIsLogined(true);
                const json = await result.json();
                if (json?.message){
                    alert(json.message)
                }
                //再表示
                window.location.reload();
            } else {
                alert('ログイン失敗')
            }
            
            setDisabled(false);
        }
        console.log(`Username: ${username}, Password: ${password}`);
    };

    /** ログアウト */
    const handleLogout =async (event :any) => {
        event.preventDefault();
        setDisabled(true);
        // ログイン処理をここに書く
        signOut();

        async function signOut() {
            const result = await fetch('api/logout',{credentials:'include'});

            if (result.ok){
                setIsLogined(false);
                //再表示
                window.location.reload();
            } else {
                alert('ログアウト失敗');
            }
            setDisabled(false);
        }


    }

    if (!isloginChecked){
        return (<div></div>)
    }else if (islogined) {
        return (
            <div>
                <input type="submit" value="ログアウト"  onClick={handleLogout} disabled={disabled}/>
            </div>
        );
    }else {
        return (
            <div>
                <h2>アカウント作成・ログイン</h2>
                <form>
                    <label>
                        ユーザー名:
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </label>
                    <label>
                        パスワード:
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label>
                    <p>
                        <input type="submit" value="アカウント作成"  onClick={handleSignin} disabled={disabled}/>
                        <input type="submit" value="ログイン" onClick={handleLogin}  disabled={disabled} />
                    </p>
                </form>
            </div>
        );
    }
}

export default Login;