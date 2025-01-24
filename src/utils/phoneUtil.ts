export function getISPProvider(phoneNumber: string): string {
    // This is a simplified version. You should replace this with your actual logic.
    const prefix = phoneNumber.slice(0, 4)
    switch (prefix) {
        case "0803":
        case "0806":
        case "0813":
        case "0816":
        case "0810":
        case "0814":
        case "0903":
        case "0906":
            return "MTN"
        case "0805":
        case "0807":
        case "0811":
        case "0815":
        case "0905":
            return "Glo"
        case "0802":
        case "0808":
        case "0812":
        case "0701":
        case "0902":
        case "0901":
        case "0904":
            return "Airtel"
        case "0809":
        case "0818":
        case "0817":
        case "0909":
            return "9mobile"
        default:
            return "Unknown"
    }
}

