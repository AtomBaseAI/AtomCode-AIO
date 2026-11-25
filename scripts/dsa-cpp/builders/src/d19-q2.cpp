#include <bits/stdc++.h>
using namespace std;

long long grid_paths(long long R, long long C) {
    std::vector<std::vector<long long>> dp(R, std::vector<long long>(C, 1));
    for (long long r = 1; r < R; r++)
        for (long long c = 1; c < C; c++)
            dp[r][c] = dp[r - 1][c] + dp[r][c - 1];
    return dp[R - 1][C - 1];
}

int main() {
    long long R, C;
    cin >> R >> C;
    cout << grid_paths(R, C) << "\n";
    return 0;
}
