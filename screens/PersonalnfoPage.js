import { useContext, useState } from "react";
import {
    StyleSheet, 
    View, 
    TextInput, 
    ActivityIndicator, 
    KeyboardAvoidingView, 
    Text, 
    TouchableOpacity} from 'react-native';
import { FIREBASE_AUTH } from "../firebase.config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import Icon from "react-native-ionicons";
import themeContext from "../src/themeContext";

export default function PersonalInfoPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;
    const [hidePass, setHidePass] = useState(false);
    const theme = useContext(themeContext);
    
    

    const signIn = async () => {
        setLoading(true);
        try {
            const responce = await signInWithEmailAndPassword(auth, email, password);
            console.log(responce);
        } catch (err) {
            console.log(err);
            alert('Sign in failed ' + err.message);
        } finally {
            setLoading(false);
        }
    }

    
    const signUp = async () => {
        setLoading(true);
        try {
            const responce = await createUserWithEmailAndPassword(auth, email, password);
            console.log(responce);
            alert('Check email.');
        } catch (err) {
            console.log(err);
            alert('Sign up failed ' + err.message);
        } finally {
            setLoading(false);
        }
    }


    return (
        <View style={[styles.page, {backgroundColor: theme.backgroundColor}]}>
            <KeyboardAvoidingView behavior="padding">
                <TextInput 
                    style={styles.input} 
                    placeholder="Email" 
                    autoCapitalize="none" 
                    placeholderTextColor="#aaa"
                    onChangeText={(text) => setEmail(text)}>
                </TextInput>
                <View style={styles.input} >
                    <TextInput
                        style={{width: '90%'}}
                        secureTextEntry={!hidePass} 
                        value={password} 
                        onChangeText={setPassword} 
                        placeholder="Password"
                        placeholderTextColor="#aaa"> 
                    </TextInput>  
                    <Icon 
                            name={hidePass ? 'eye' : 'eye-off'} 
                            size={24} 
                            color="#aaa"
                            style={{marginHorizontal: 10}} 
                            onPress={() => setHidePass(!hidePass)} />
                </View>

                {loading ? <ActivityIndicator size="large" color="#0000ff" /> 
                : <View style={{marginTop:30}}>
                    <TouchableOpacity style={[styles.button, {backgroundColor: "#2196F3"}]} onPress={signIn}>
                        <Text style={[styles.buttonText, {color: 'white'}]}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} title="Register" onPress={signUp}>
                        <Text style={[styles.buttonText,  {color: theme.textColor,}]}>Register</Text>
                    </TouchableOpacity>
                </View>}
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    page: {
        flex:1, 
        justifyContent: 'center'
    },
    input: {
        marginVertical: 4,
        marginHorizontal: 20,
        height: 45,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#fff',
        fontWeight: '400',
        flexDirection:'row',
    },
    button: {
        borderRadius: 10,
        height: 50,
        padding:10,
        marginVertical:4,
        marginHorizontal: 60,
        borderWidth: 2,
        borderColor: '#2196F3',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 20,
        fontWeight: '600'
    },
});