<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login — Algero Admin</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: 'Inter', -apple-system, sans-serif;
            background: #030712;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            overflow: hidden;
        }

        /* Animated background grid */
        body::before {
            content: '';
            position: fixed;
            inset: 0;
            background-image: linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
            background-size: 40px 40px;
            z-index: 0;
            pointer-events: none;
        }

        /* Animated background orbs */
        .orb {
            position: fixed;
            border-radius: 50%;
            filter: blur(120px);
            opacity: 0.2;
            z-index: 0;
            animation: float 8s ease-in-out infinite;
        }
        .orb-1 {
            width: 500px; height: 500px;
            background: #3b82f6;
            top: -150px; right: -100px;
        }
        .orb-2 {
            width: 400px; height: 400px;
            background: #06b6d4;
            bottom: -100px; left: -100px;
            animation-direction: reverse;
            animation-duration: 10s;
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
            background: rgba(17, 24, 39, 0.5);
            backdrop-filter: blur(20px) saturate(180%);
            -webkit-backdrop-filter: blur(20px) saturate(180%);
            border: 1px solid rgba(255, 255, 255, 0.06);
            border-radius: 16px;
            padding: 48px 40px;
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }

        .login-brand {
            text-align: center;
            margin-bottom: 36px;
        }
        .login-brand .logo {
            width: 56px; height: 56px;
            background: rgba(59, 130, 246, 0.2);
            border: 1px solid rgba(59, 130, 246, 0.3);
            border-radius: 14px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 26px;
            margin-bottom: 16px;
            color: #60a5fa;
            box-shadow: 0 8px 32px rgba(59, 130, 246, 0.15);
        }
        .login-brand h1 {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 24px;
            font-weight: 700;
            color: #f9fafb;
            letter-spacing: -0.5px;
        }
        .login-brand p {
            color: #9ca3af;
            font-size: 14px;
            margin-top: 6px;
        }

        .form-group { margin-bottom: 22px; }
        .form-group label {
            display: block;
            font-size: 12px;
            font-weight: 600;
            color: #9ca3af;
            margin-bottom: 8px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .form-control {
            width: 100%;
            padding: 12px 16px;
            background: rgba(3, 7, 18, 0.5);
            border: 1px solid rgba(255, 255, 255, 0.06);
            border-radius: 10px;
            color: #f9fafb;
            font-size: 15px;
            font-family: inherit;
            transition: all 0.2s ease;
        }
        .form-control:focus {
            outline: none;
            border-color: #3b82f6;
            box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15);
        }
        .form-control::placeholder { color: #6b7280; }

        .remember-row {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 28px;
        }
        .remember-row input { width: 16px; height: 16px; accent-color: #3b82f6; cursor: pointer; }
        .remember-row label { font-size: 13px; color: #9ca3af; cursor: pointer; margin: 0; text-transform: none; letter-spacing: 0; }

        .btn-login {
            width: 100%;
            padding: 13px;
            background: #3b82f6;
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
            background: #60a5fa;
            box-shadow: 0 8px 32px rgba(59, 130, 246, 0.25);
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
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="login-container">
        <div class="login-card">
            <div class="login-brand">
                <div class="logo">
                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 506.08 625.13" width="32" height="32" style="enable-background:new 0 0 506.08 625.13;" xml:space="preserve">
                        <g>
                            <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="118.2116" y1="313.0464" x2="320.8507" y2="28.0154">
                                <stop offset="5.072736e-09" style="stop-color:#486273"/>
                                <stop offset="1" style="stop-color:#AFB4B8"/>
                            </linearGradient>
                            <path style="fill:url(#SVGID_1_);" d="M341.45,136.57c-48.47,28.02-105.07,67.22-161.28,121.74c-22.31,21.64-41.96,43.17-59.23,63.92
                                c-0.58-1.89-1.15-3.79-1.69-5.7c-6.56-23.11-17.82-64.68-5.15-113.89c20.03-77.78,86.08-120.6,109.12-135.83
                                c32.71-21.63,63.89-32.3,85.36-37.86L341.45,136.57z"/>
                            <linearGradient id="SVGID_2_" gradientUnits="userSpaceOnUse" x1="256.5346" y1="208.2447" x2="383.4624" y2="624.657">
                                <stop offset="5.072736e-09" style="stop-color:#486273"/>
                                <stop offset="1" style="stop-color:#7FB5E1"/>
                            </linearGradient>
                            <path style="fill:url(#SVGID_2_);" d="M484.5,604.95
                                c-22.6-6.07-59.48-17.3-102.44-37.11c-31.36-14.46-93.39-43.06-150.42-90.05c19.5-33.39,39.1-70.66,57.64-111.85
                                c30.04-66.73,50.92-129.57,65.63-185.31L484.5,604.95z"/>
                            <linearGradient id="SVGID_3_" gradientUnits="userSpaceOnUse" x1="26.0391" y1="601.9418" x2="337.7917" y2="183.3027">
                                <stop offset="0" style="stop-color:#367EB8"/>
                                <stop offset="1" style="stop-color:#ADD6EC"/>
                            </linearGradient>
                            <path style="fill:url(#SVGID_3_);" d="M22.12,597.53
                                c0.31-16.01,1.84-39,7.63-65.88c4.04-18.72,20.8-88.74,107.42-190.2c38.08-44.61,99.61-106.95,190.76-164.78
                                c-11.14,46.93-50.77,201.93-134.6,314.72c-62.23,83.73-114.79,98.43-133.36,102.43C44.51,597.15,31.24,597.66,22.12,597.53z"/>
                            <linearGradient id="SVGID_4_" gradientUnits="userSpaceOnUse" x1="156.217" y1="123.0202" x2="169.5778" y2="265.5357">
                                <stop offset="0" style="stop-color:#5F686D"/>
                                <stop offset="1" style="stop-color:#2E353B"/>
                            </linearGradient>
                            <path style="opacity:0.5;fill:url(#SVGID_4_);" d="M225.5,217.58
                                c-15.01,12.52-30.15,26.07-45.27,40.73c-22.31,21.64-41.96,43.17-59.23,63.92c-0.58-1.89-1.15-3.79-1.69-5.7
                                c-2.75-9.7-6.33-22.66-8.62-38.06c-3.17-21.3-3.88-47.27,3.47-75.83c16.72-64.92,65.5-105.48,94.57-125.98
                                c-4.29,38.98,1.91,79.88,8.35,108.76C220.23,199.57,223.44,210.84,225.5,217.58z"/>
                            <path style="opacity:0.5;fill:#616A6F;" d="M341.39,136.64c-35.4,20.47-75.14,46.92-115.89,80.94c-15.01,12.52-30.15,26.07-45.27,40.73
                                c-22.31,21.64-41.96,43.17-59.23,63.92c-0.58-1.89-1.15-3.79-1.69-5.7c-2.75-9.7-6.33-22.66-8.62-38.06
                                c11.69-18.46,41.91-57.17,106.39-93.05C249.3,167.49,290.08,150.27,341.39,136.64z"/>
                            <linearGradient id="SVGID_5_" gradientUnits="userSpaceOnUse" x1="231.7012" y1="489.422" x2="484.5612" y2="489.422">
                                <stop offset="0" style="stop-color:#2F4552"/>
                                <stop offset="1" style="stop-color:#7FB5E1"/>
                            </linearGradient>
                            <path style="opacity:0.5;fill:url(#SVGID_5_);" d="M484.56,604.95
                                c-22.6-6.07-59.48-17.3-102.44-37.11c-19.77-9.12-51.73-23.86-86.94-45.27c-20.64-12.56-42.4-27.41-63.48-44.78
                                c18.24-31.23,36.56-65.84,54.02-103.89c11.95,29.05,24.77,53.81,36.71,74.21c6.25,10.67,12.25,20.16,17.75,28.43
                                c25.86,38.85,50.88,75.61,97.45,105.03c16.49,10.41,34.89,18.47,46.87,23.19L484.56,604.95z"/>
                            <linearGradient id="SVGID_6_" gradientUnits="userSpaceOnUse" x1="369.2541" y1="183.7395" x2="262.3675" y2="507.7395">
                                <stop offset="0" style="stop-color:#2F4552"/>
                                <stop offset="1" style="stop-color:#7FB5E1"/>
                            </linearGradient>
                            <path style="opacity:0.5;fill:url(#SVGID_6_);" d="M339.07,384.5
                                c-4.87,22.57-10.53,43.78-16.64,63.61c-8.5,27.58-17.88,52.47-27.25,74.46c-20.64-12.56-42.4-27.41-63.48-44.78
                                c18.24-31.23,36.56-65.84,54.02-103.89c1.21-2.64,2.42-5.29,3.62-7.96c30.04-66.73,50.92-129.57,65.63-185.31l0.14,0.46
                                C357.45,233.95,355.43,308.66,339.07,384.5z"/>
                        </g>
                    </svg>
                </div>
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
