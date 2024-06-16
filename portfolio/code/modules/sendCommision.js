export function send(text){
    return fetch("https://discord.com/api/webhooks/1251700053308080179/-12e-v-82jWkz0yY18YNzkWsz3yHCMJmxGD5HYpLatpf7K9_f9Zy1BR-EZHpxUUKhh6X", {
        body: JSON.stringify({
            content: text
        }),
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST"
    })
}