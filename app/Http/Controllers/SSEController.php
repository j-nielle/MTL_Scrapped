<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\RequestNotifs;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\StreamedResponse;

class SSEController extends Controller
{
    private $notifs;
    private $overall;

    /**
     * @return StreamedResponse
     */
    public function fetchData()
    {
        $this->fetchDataFromDatabase();

        return new StreamedResponse(function () {
            $this->setSSEHeaders();

            while (true) {
                $responseData = json_encode($this->notifs);

                echo "data: $responseData\n\n";
                $this->flushOutputBuffer();

                sleep(1);
            }
        });
    }

    /**
     * Fetch data from the database.
     */
    private function fetchDataFromDatabase()
    {
        $this->notifs = DB::table('requestNotifs')->orderBy('created_at', 'desc')->get();
        $this->overall = DB::table('allMoods')->get();
    }

    /**
     * Set headers for Server-Sent Events (SSE).
     */
    private function setSSEHeaders()
    {
        header('Content-Type: text/event-stream');
        header('Cache-Control: no-cache');
        header('Connection: keep-alive');
    }

    /**
     * Flush the output buffer.
     */
    private function flushOutputBuffer()
    {
        ob_flush();
        flush();
    }
}