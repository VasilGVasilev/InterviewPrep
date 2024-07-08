The orientation locker library does not override rotation locking on the device, the client has to enable or disable that manually.

In essence, the system-level rotation lock on iOS devices is designed to restrict rotation across all apps, and individual apps cannot override this setting through code. 
Android allows more flexibility for apps to control their orientation, even when a device-wide rotation lock is enabled by the user. However, the effectiveness of overriding the rotation lock can depend on the device manufacturer, Android version, and specific user settings.