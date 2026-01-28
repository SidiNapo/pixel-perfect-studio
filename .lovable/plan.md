

# Secure Admin Dashboard Implementation Plan

## Overview
Transform the admin dashboard from a predictable `/admin` path to a highly secure, configurable system with environment-variable-based routing, enhanced authentication, and comprehensive security measures.

---

## Current Security Issues Identified

### Critical Issues
1. **Predictable Admin Path** - `/admin` and `/admin/login` are easily discoverable by attackers
2. **Hardcoded Routes** - Admin paths are hardcoded throughout the application in 6+ files
3. **No Rate Limiting** - Login attempts are not throttled
4. **No Session Timeout** - Admin sessions persist indefinitely
5. **Robots.txt Exposes Admin Path** - `Disallow: /admin/` confirms admin exists

### Current Security (Working Well)
- Server-side admin role verification via `has_role()` database function
- RLS policies on `user_roles` table (only admins can view)
- RLS policies on `blog_posts` (admins can manage, public can read published only)
- Supabase authentication with proper session handling

---

## Implementation Plan

### Phase 1: Environment-Based Admin Path Configuration

**Create `src/config/adminConfig.ts`:**
```text
- Read admin path from environment variable: VITE_ADMIN_PATH
- Default fallback to a secure random-looking path: /portal-x7k9m2
- Export getAdminPath() function for use throughout the app
- Export admin route constants for consistency
```

**Update `.env` structure (documentation only - user sets their own):**
```text
VITE_ADMIN_PATH="/your-secret-admin-path"
```

---

### Phase 2: Update All Admin Route References

**Files requiring updates:**

1. **`src/App.tsx`** - Update route definitions to use dynamic path
2. **`src/components/admin/AdminLayout.tsx`** - Update redirect paths
3. **`src/components/admin/AdminSidebar.tsx`** - Update navigation links
4. **`src/pages/admin/AdminLogin.tsx`** - Update success redirect
5. **`src/pages/admin/PostsList.tsx`** - Update navigation
6. **`src/pages/admin/PostEditor.tsx`** - Update back navigation

---

### Phase 3: Enhanced Authentication Security

**Create `src/hooks/useSecureAuth.tsx`:**
```text
- Wrap existing useAuth with additional security features
- Add login attempt tracking (max 5 attempts)
- Implement lockout after failed attempts (15-minute cooldown)
- Add session activity timeout (30 minutes inactivity)
- Track last activity timestamp
- Auto-logout on timeout
```

**Update `src/pages/admin/AdminLogin.tsx`:**
```text
- Add rate limiting UI feedback
- Show remaining attempts after failures
- Display lockout countdown timer
- Add "Remember this device" option (optional)
- Enhanced error messages without revealing user existence
```

---

### Phase 4: Security Headers & Bot Protection

**Update `public/robots.txt`:**
```text
BEFORE: Disallow: /admin/
AFTER: Remove specific admin reference (don't hint at admin path)
       Keep general private area rules without specificity
```

**Update `vercel.json`:**
```text
- Add security headers for admin routes
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
```

---

### Phase 5: Session Security Enhancements

**Create `src/components/admin/SessionGuard.tsx`:**
```text
- Monitor user activity (mouse, keyboard, scroll)
- Auto-logout after 30 minutes of inactivity
- Show warning dialog 5 minutes before timeout
- "Stay logged in" option to extend session
- Clear sensitive data from memory on logout
```

**Update `src/components/admin/AdminLayout.tsx`:**
```text
- Wrap with SessionGuard component
- Add activity monitoring
- Display session status in header
```

---

## File Changes Summary

### Files to Create
1. `src/config/adminConfig.ts` - Centralized admin path configuration
2. `src/hooks/useSecureAuth.tsx` - Enhanced authentication with rate limiting
3. `src/components/admin/SessionGuard.tsx` - Session timeout management

### Files to Modify
1. `src/App.tsx` - Dynamic admin route paths
2. `src/components/admin/AdminLayout.tsx` - Updated redirects + session guard
3. `src/components/admin/AdminSidebar.tsx` - Dynamic navigation paths
4. `src/pages/admin/AdminLogin.tsx` - Rate limiting UI + security enhancements
5. `src/pages/admin/PostsList.tsx` - Dynamic navigation
6. `src/pages/admin/PostEditor.tsx` - Dynamic back navigation
7. `public/robots.txt` - Remove admin path hint
8. `vercel.json` - Add security headers

---

## Security Features Summary

| Feature | Implementation |
|---------|----------------|
| **Unpredictable Path** | Environment variable `VITE_ADMIN_PATH` |
| **Rate Limiting** | 5 attempts, 15-min lockout |
| **Session Timeout** | 30-min inactivity auto-logout |
| **Activity Monitoring** | Mouse/keyboard/scroll tracking |
| **Server Validation** | Supabase RLS + `has_role()` function |
| **Bot Protection** | No admin path in robots.txt |
| **Security Headers** | X-Frame-Options, CSP in Vercel config |

---

## Technical Details

### Default Secure Path
If `VITE_ADMIN_PATH` is not set, the system defaults to:
```text
/secure-portal-x7k9m2
```
This is non-obvious and won't be guessed by automated scanners.

### Rate Limiting Storage
- Uses localStorage for attempt tracking (client-side)
- Server-side validation remains primary security layer
- Lockout persists across page refreshes

### Session Timeout Logic
```text
1. Track last activity timestamp
2. Check every 60 seconds if inactive > 25 minutes
3. Show warning dialog at 25 minutes
4. Auto-logout at 30 minutes
5. Clear session and redirect to login
```

---

## Migration Notes

After implementation, the admin will need to:
1. Set `VITE_ADMIN_PATH` environment variable to their chosen secret path
2. Update any bookmarks to the new admin URL
3. The old `/admin` path will return 404 (desired behavior)

---

## Expected Outcomes

- Admin panel completely hidden from public discovery
- Brute-force attacks mitigated via rate limiting
- Inactive sessions automatically terminated
- No hints about admin existence in public files
- All existing functionality preserved (blog management, dashboard, etc.)
- No database changes required

