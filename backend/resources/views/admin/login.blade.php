<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login — Algero Admin</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: 'Inter', -apple-system, sans-serif;
            background: #0a0e1a;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            overflow: hidden;
        }

        /* Animated background orbs */
        body::before, body::after {
            content: '';
            position: fixed;
            border-radius: 50%;
            filter: blur(120px);
            opacity: 0.3;
            z-index: 0;
        }
        body::before {
            width: 500px; height: 500px;
            background: #6366f1;
            top: -150px; right: -100px;
            animation: float 8s ease-in-out infinite;
        }
        body::after {
            width: 400px; height: 400px;
            background: #a78bfa;
            bottom: -100px; left: -100px;
            animation: float 10s ease-in-out infinite reverse;
        }
        @keyframes float {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(30px, -40px) scale(1.1); }
        }

        .login-container {
            position: relative;
            z-index: 1;
            width: 100%;
            max-width: 420px;
            padding: 20px;
        }

        .login-card {
            background: rgba(17, 24, 39, 0.85);
            backdrop-filter: blur(24px);
            border: 1px solid rgba(99, 102, 241, 0.15);
            border-radius: 16px;
            padding: 48px 40px;
            box-shadow: 0 24px 80px rgba(0, 0, 0, 0.5);
        }

        .login-brand {
            text-align: center;
            margin-bottom: 36px;
        }
        .login-brand .logo {
            width: 56px; height: 56px;
            background: linear-gradient(135deg, #6366f1, #a78bfa);
            border-radius: 14px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 26px;
            margin-bottom: 16px;
            box-shadow: 0 8px 32px rgba(99, 102, 241, 0.25);
        }
        .login-brand h1 {
            font-size: 24px;
            font-weight: 700;
            background: linear-gradient(135deg, #e2e8f0, #94a3b8);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            letter-spacing: -0.5px;
        }
        .login-brand p {
            color: #64748b;
            font-size: 14px;
            margin-top: 6px;
        }

        .form-group { margin-bottom: 22px; }
        .form-group label {
            display: block;
            font-size: 12px;
            font-weight: 600;
            color: #94a3b8;
            margin-bottom: 8px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .form-control {
            width: 100%;
            padding: 12px 16px;
            background: rgba(10, 14, 26, 0.8);
            border: 1px solid #2a3050;
            border-radius: 10px;
            color: #e2e8f0;
            font-size: 15px;
            font-family: inherit;
            transition: all 0.2s ease;
        }
        .form-control:focus {
            outline: none;
            border-color: #6366f1;
            box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15);
        }
        .form-control::placeholder { color: #475569; }

        .remember-row {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 28px;
        }
        .remember-row input { width: 16px; height: 16px; accent-color: #6366f1; cursor: pointer; }
        .remember-row label { font-size: 13px; color: #94a3b8; cursor: pointer; margin: 0; text-transform: none; letter-spacing: 0; }

        .btn-login {
            width: 100%;
            padding: 13px;
            background: linear-gradient(135deg, #6366f1, #818cf8);
            border: none;
            border-radius: 10px;
            color: #fff;
            font-size: 15px;
            font-weight: 600;
            font-family: inherit;
            cursor: pointer;
            transition: all 0.2s ease;
            letter-spacing: 0.3px;
        }
        .btn-login:hover {
            box-shadow: 0 8px 32px rgba(99, 102, 241, 0.35);
            transform: translateY(-1px);
        }
        .btn-login:active { transform: translateY(0); }

        .error-msg {
            background: rgba(239, 68, 68, 0.1);
            border: 1px solid rgba(239, 68, 68, 0.25);
            border-radius: 10px;
            padding: 12px 16px;
            margin-bottom: 24px;
            color: #f87171;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="login-container">
        <div class="login-card">
            <div class="login-brand">
                <div class="logo">🔐</div>
                <h1>Algero Admin</h1>
                <p>Sign in to manage your content</p>
            </div>

            @if($errors->any())
                <div class="error-msg">
                    @foreach($errors->all() as $error)
                        {{ $error }}
                    @endforeach
                </div>
            @endif

            <form method="POST" action="/admin/login">
                @csrf
                <div class="form-group">
                    <label for="email">Email Address</label>
                    <input type="email" id="email" name="email" class="form-control"
                           value="{{ old('email') }}" placeholder="admin@algero.com" required autofocus>
                </div>

                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" class="form-control"
                           placeholder="••••••••" required>
                </div>

                <div class="remember-row">
                    <input type="checkbox" id="remember" name="remember">
                    <label for="remember">Remember me</label>
                </div>

                <button type="submit" class="btn-login">Sign In</button>
            </form>
        </div>
    </div>
</body>
</html>
