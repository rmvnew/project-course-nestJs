export class Utils {

    private static instance: Utils
    public static getInstance(): Utils {
        if (!Utils.instance) {
            Utils.instance = new Utils()
        }
        return Utils.instance
    }


    generateEnrollmentNumber(): string {

        const currentDate = new Date();


        const day = currentDate.getDate().toString().padStart(2, '0');
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const year = currentDate.getFullYear();

        const randomSuffix = Math.floor(Math.random() * 9999).toString().padStart(4, '0');

        return `${day}-${month}-${year}-${randomSuffix}`;
    }


}