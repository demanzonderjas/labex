<?php

namespace App\Console\Commands;

use App\Imports\SignupImport;
use Illuminate\Console\Command;
use Maatwebsite\Excel\Facades\Excel;

class RadboudImport extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'import:radboud';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Import the Radboud users';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        Excel::import(new SignupImport, 'radboud-atex.xlsx');
        info("import completed");

        return 0;
    }
}
