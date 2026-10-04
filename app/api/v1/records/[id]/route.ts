import { NextResponse } from "next/server";
import { RecordResult, MOCK_RECORDS } from "@/lib/mockRecords";

export async function GET(request: Request, { params } : {params: Promise<{id : string}>}) {
    const { id } = await params;

    const records : RecordResult[] = MOCK_RECORDS.filter((record : RecordResult) => record.id == id);
    if (records.length === 0){
        return NextResponse.json({message : "Record Not Found"}, {status : 404});
    }else{
        return NextResponse.json({
            message: "Record found",
            record: records[0]
        }, {status : 200});
    }
}