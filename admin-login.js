    const form = document.getElementById("loginForm");
    const message = document.getElementById("message");

    form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
        const res = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        });

        const data = await res.json();

        if (res.ok) {
        message.style.color = "green";
        message.textContent = "✅ Tizimga muvaffaqiyatli kirdingiz!";

        // Tokenni localStorage ga saqlaymiz
        localStorage.setItem("token", data.token);

        // Admin panelga yo‘naltirish
        setTimeout(() => {
            window.location.href = "admin-panel.html";
        }, 1000);
        } else {
        message.style.color = "red";
        message.textContent = data.message || "❌ Login yoki parol xato";
        }
    } catch (err) {
        message.style.color = "red";
        message.textContent = "Server bilan aloqa yo‘q 😢";
    }
    });
