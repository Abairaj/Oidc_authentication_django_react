import pkceChallenge from "pkce-challenge";


 export async function generatePKCE() {
    const {code_verifier, code_challenge} = await pkceChallenge();
    localStorage.setItem("pkce_code_verifier", code_verifier);
    return code_challenge
}

export function getCodeVerifier() {
    return localStorage.getItem("pkce_code_verifier");
}