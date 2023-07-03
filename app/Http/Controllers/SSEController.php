<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\RequestNotifs;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\StreamedResponse;

class SSEController extends Controller
{
    public function __construct()
    {
        // Initialize the properties with null values
        $this->notifs = null;
        $this->overall = null;
    }

    public function fetchData()
    {
        $this->notifs = DB::table('requestNotifs')->orderBy('created_at','desc')->get();
        $this->overall = DB::table('allMoods')->get();

        return new StreamedResponse(function () {
            header('Content-Type: text/event-stream');
            while (true) {
                $requests = $this->notifs; // Use $this->notifs instead of undefined $notifs
                $responseData = json_encode($requests); // Encode the data in JSON format
                echo "data: $responseData\n\n";
                ob_flush(); // Flush the output buffer
                flush(); // Flush the output buffer and turn off output buffering
                
                sleep(1); // Sleep for 1 second before sending the next event
            }
        });
    }
}