import { exec } from "child_process";

export async function runHello() {
    return new Promise((resolve, reject) => {
        exec("C:\ai-product-visualizer\src\license-header-adder\my_script.py", (err, stdout) => {
            if (err) reject(err);
            else resolve(stdout.trim());
        });
    });
}
