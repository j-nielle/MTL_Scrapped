<?php

namespace App\Jobs;

use App\Models\Requests;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Contracts\Queue\ShouldBeUnique;

class FetchDataJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $requests = Requests::select('contact.contactNum', 'request_type.requestType')
                                    ->join('request_type', 'request_type.requestTypeID', '=', 'request.requestTypeID')
                                    ->join('contact', 'contact.contactID', '=', 'request.contactID')
                                    ->orderBy('requestID','desc')->get();
        $responseData = json_encode($requests); // Encode the data in JSON format
                
        echo "data: $responseData\n\n";
    }
}
