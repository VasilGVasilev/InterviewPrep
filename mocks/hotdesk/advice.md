Build better API, in terms of structuring DB to be segmented, any new additional subexercise basically means -> add a DB entity; Also think in terms of what will happen if the request's time starts getting longer due to bigger resource (instead of having 5 slots to book -> have 10000), how to split that into meaningful self-contained DB entitites.

clear the DB <-> BE <-> FE structure, what is visible is the FE, resuable templates with props, BE is the functionality triggered in terms of DB massaging and DB is to be as divided into modals as possible, one for FE resources, and another one for each added functionality.

It would be a better to learn microservices architecture for a more detailed BE.