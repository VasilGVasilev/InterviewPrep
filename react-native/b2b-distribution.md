*App was designed for a specific business or organization and not for general distribution on the App Store.*

**Potential third party solution**

coming-soon-to-apple-third-party-app-stores-and-sideloading-apps.html

Apple seems to be opening up for alternative distribution of apps: marketplaces and sideloading.

Sideloading - installing app by directly downloading it as it is with other platforms: windows, etc. Sideloading is similar to what now is TestFlight beta testing without the limitation of 100 internal testers. 
It seems that sideloading is looked down upon by Apple and will not be allowed in practice. 

Marketplaces will have less vetting by Apple, but still Apple will impose control on which Marketplaces are allowed, as well as, the apps distributed there.

Apple way

‘Apple is pushing for the Custom App method to distribute these "limited audience" applications. There is also the Enterprise Program that was present before it.’

https://developer.apple.com/forums/thread/122473

**How to distribute via Apple Business Manager**
https://support.apple.com/en-gb/guide/apple-business-manager/axm58ba3112a/web

1. Develop Custom Apps
2. Create an Account in Apple Business Manager for client: using Google Workspace https://support.apple.com/en-gb/guide/apple-business-manager/axmaef1a0154/1/web/1 or Azure
3. Submit Custom Apps through App Store Connect: Once your app is developed, submit it through App Store Connect and assign it to your Apple Business Manager account.
4. Get the App Approved
5. Distribute the App: There are two main methods for distributing your custom app to specific people within your organization:
    * Mobile Device Management (MDM). This includes buying devices to enrol on the ABM of the client (pricey) or configuring each device with Apple Configuration app manually 
    * Redemption Codes: Providing users with redemption codes for each private Custom App, still devices must be enrolled like with the MDM option https://youtu.be/k0cchC6mE88?t=839 


In summary:

App Store public way 
- TestFlight App Store but limited testers and misuse (beta testing as an official app)

Private way
- Apple Business Manager but making client dev account and subsequent managment has overhead (even with Google Workspace or Azure)
- Third party via new potentially less strict Marketplaces (to be announced)