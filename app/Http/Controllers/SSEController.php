<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\StreamedResponse;

use App\Models\Student;
use App\Models\Mood;
use App\Models\Contact;
use App\Models\RequestType;
use App\Models\Requests;
use App\Models\StudentMood;
use App\Models\AnonMood;
use App\Models\Reason;

class SSEController extends Controller
{
    public function fetchData()
    {
        return new StreamedResponse(function () {
            header('Content-Type: text/event-stream');
            while (true) {
                $requests = Requests::select('contact.contactNum', 'request_type.requestType')
                                    ->join('request_type', 'request_type.requestTypeID', '=', 'request.requestTypeID')
                                    ->join('contact', 'contact.contactID', '=', 'request.contactID')
                                    ->orderBy('requestID','desc')->get();
                $responseData = json_encode($requests); // Encode the data in JSON format
                
                echo "data: $responseData\n\n";
                ob_flush(); // Flush the output buffer
                flush(); // Flush the output buffer and turn off output buffering
                
                sleep(1); // Sleep for 1 second before sending the next event
            }
        });
    }
}